package models


import javax.inject.Inject
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.mvc.Result

import scala.concurrent.{ExecutionContext, Future}
import slick.jdbc.JdbcProfile
import slick.jdbc.MySQLProfile.api._
import utils.JS

/***/
case class RoleData(id: Int, code: String, name: String, create_at: Option[Long], update_at: Option[Long])
class RoleTableDef(tag: Tag) extends Table[RoleData](tag, "roles") {
  def id = column[Int]("id", O.PrimaryKey,O.AutoInc)
  def code = column[String]("code")
  def name = column[String]("name")
  def create_at = column[Option[Long]]("create_at")
  def update_at = column[Option[Long]]("update_at")
  override def * =
    (id, code, name, create_at, update_at) <> (RoleData.tupled, RoleData.unapply)
}

/***/
case class RoleForm(code: String, name: String)
class RoleFormDef(tag: Tag) extends Table[RoleForm](tag, "roles") {
  def code = column[String]("code")
  def name = column[String]("name")
  override def * =
    (code, name) <> (RoleForm.tupled, RoleForm.unapply)
}

/***/
class DRole @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)
                     (implicit executionContext: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile] {

  private val RoleForm = TableQuery[RoleFormDef]

  private val RoleData = TableQuery[RoleTableDef]

  def insert(role: RoleData): Future[String] = db.run(RoleData += role).map {
    res => "User successfully added"
  }.recover{
    case ex: Exception => ex.getCause.getMessage
  }

  def deleteById(id: Int): Future[Result] = {
    db.run(RoleData.filter(_.id === id).delete)
    Future(JS.OK("data" -> "delete Success!!"))
  }

  def update(roleData: RoleData)={
    val q = RoleData.filter(_.id === roleData.id)
      .map(p => (p.code,p.name,p.update_at))
      .update((roleData.code,roleData.name,Some(System.currentTimeMillis()/1000)))
    db.run(q)
    Future(JS.OK("data" -> "update Success!!"))
  }
}