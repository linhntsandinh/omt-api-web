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
case class HolidayData(id: Int, start_date: Option[Long], end_date: Option[Long], types: Option[Int], is_salary: Option[Int])
object HolidayData {
  implicit val reader = Json.reads[HolidayData]
  implicit val writer = Json.writes[HolidayData]
}
class HolidayTableDef(tag: Tag) extends Table[HolidayData](tag, "holidays") {
  def id = column[Int]("id", O.PrimaryKey,O.AutoInc)
  def start_date = column[Option[Long]]("start_date")
  def end_date = column[Option[Long]]("end_date")
  def types = column[Option[Int]]("type")
  def is_salary = column[Option[Int]]("is_salary")

  override def * =
    (id, start_date, end_date, types, is_salary) <>((HolidayData.apply _).tupled, HolidayData.unapply)
}
class Holiday  @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)
                            (implicit executionContext: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile] {
  private val HolidayTable = TableQuery[HolidayTableDef]
  def insert(result: HolidayData): Future[Result] = {
    val q = db.run(HolidayTable += result)
    q.onComplete{
      rs=>{
        println(rs)
      }
    }
    Future(JS.OK("data" -> "insert Success!!"))
  }
  def delete(Id: Int): Future[Result] = {
    db.run(HolidayTable.filter(_.id === Id).delete)
    Future(JS.OK("data" -> "delete Success!!"))
  }
  def update(result: HolidayData)={
    val q = HolidayTable.filter(_.id === result.id)
      .map(p => (p.id,p.start_date,p.end_date,p.types,p.is_salary))
      .update((result.id,result.start_date,result.end_date,result.types,result.is_salary))
    db.run(q)
    Future(JS.OK("data" -> "update Success!!"))
  }
}