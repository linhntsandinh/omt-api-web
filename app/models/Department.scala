package models

import play.api.libs.json.Json
import javax.inject.Inject
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json.Json
import play.api.mvc.Result
import slick.jdbc.JdbcProfile
import slick.jdbc.MySQLProfile.api._
import utils.JS
import scala.concurrent.{ExecutionContext, Future}
case class DepartmentData(id: Int, name: String)
object DepartmentData {
  implicit val reader = Json.reads[DepartmentData]
  implicit val writer = Json.writes[DepartmentData]
}
class DepartmentTableDef(tag: Tag) extends Table[DepartmentData](tag, "departments") {
  def id = column[Int]("id", O.PrimaryKey,O.AutoInc)
  def name = column[String]("name")

  override def * =
    (id, name) <>((DepartmentData.apply _).tupled, DepartmentData.unapply)
}
class Department  @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)
                                (implicit executionContext: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile] {
  private val DepartmentTable = TableQuery[DepartmentTableDef]
  def insert(result: DepartmentData): Future[Result] = {
    val q = db.run(DepartmentTable += result)
    q.onComplete{
      rs=>{
        println(rs)
      }
    }
    Future(JS.OK("data" -> "insert Success!!"))
  }
  def delete(Id: Int): Future[Result] = {
    db.run(DepartmentTable.filter(_.id === Id).delete)
    Future(JS.OK("data" -> "delete Success!!"))
  }
  def update(result: DepartmentData)={
    val q = DepartmentTable.filter(_.id === result.id)
      .map(p => (p.id,p.name))
      .update((result.id,result.name))
    db.run(q)
    Future(JS.OK("data" -> "update Success!!"))
  }
}