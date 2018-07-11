package models


import javax.inject.Inject
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json.Json
import play.api.mvc.Result
import utils.JS

import scala.concurrent.{ExecutionContext, Future}
import slick.jdbc.JdbcProfile
import slick.jdbc.MySQLProfile.api._
import utils.JS.OK

/***/
case class UserRoleData(id: Int, userId: Int, roleId: Int)

object UserRoleData {
  implicit val reader = Json.reads[UserRoleData]
  implicit val writes = Json.writes[UserRoleData]

}
class UserRoleTableDef(tag: Tag) extends Table[UserRoleData](tag, "user_roles") {
  def id = column[Int]("id", O.PrimaryKey,O.AutoInc)
  def userId = column[Int]("user_id")
  def roleId = column[Int]("role_id")
  override def * =
    (id, userId, roleId) <> ((UserRoleData.apply _).tupled, UserRoleData.unapply)
}

/***/
case class UserRoleForm(userId: Int, roleId: Int)

object UserRoleForm {
  implicit val reader = Json.reads[UserRoleForm]
  implicit val writes = Json.writes[UserRoleForm]

}
class UserRoleFormDef(tag: Tag) extends Table[UserRoleForm](tag, "user_roles") {
  def userId = column[Int]("user_id")
  def roleId = column[Int]("role_id")
  override def * =
    (userId, roleId) <>((UserRoleForm.apply _).tupled, UserRoleForm.unapply)
}

/***/
class UserRole @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)
                            (implicit executionContext: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile] {

  private val UserRole  = TableQuery[UserRoleFormDef]

  private val UserRoleData = TableQuery[UserRoleTableDef]

  def insert(userRoleForm: UserRoleForm): Future[Result] = {
    val q = ((UserRole.filter(_.roleId === userRoleForm.roleId)).filter(_.userId === userRoleForm.userId)).result
    val rs = db.run {
      q
    }
    rs.map {
      list => {
        list.size match {
          case 0 => {
            db.run(UserRole += userRoleForm).map {
              res => "User successfully added"
            }.recover {
              case ex: Exception => ex.getCause.getMessage
            }
            OK("value" -> "sucess!!")
          }
          case _ => {
            OK("value" -> "existed")
          }
        }
      }
    }
  }
  def deleteByUserId(userId: Int): Future[Int] = {
    db.run(UserRole.filter(_.userId === userId).delete)
  }
  def delete(userRoleId: Int): Future[Int] = {
    db.run(UserRoleData.filter(_.id === userRoleId).delete)
  }
}