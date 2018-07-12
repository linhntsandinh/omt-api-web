package models

import javax.inject.Inject
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json.Json
import slick.jdbc.JdbcProfile
import slick.jdbc.MySQLProfile.api._

import scala.concurrent.{ExecutionContext, Future}


case class TimelogData(id: Option[Int], user_id: Int, date: Long, start_time: Long, end_time: Long, device_info: String, created_at: Option[Long], updated_at: Option[Long], created_by: Option[Long], updated_by: Option[Long])

object TimelogData {
  implicit val reader = Json.reads[TimelogData]
  implicit val writer = Json.writes[TimelogData]

}

class TimelogTableDef(tag: Tag) extends Table[TimelogData](tag, "time_logs") {
  def id = column[Option[Int]]("id", O.PrimaryKey, O.AutoInc)

  def user_id = column[Int]("user_id")

  def date = column[Long]("date")

  def start_time = column[Long]("start_time")

  def end_time = column[Long]("end_time")

  def device_info = column[String]("device_info")

  def created_at = column[Option[Long]]("created_at")

  def updated_at = column[Option[Long]]("updated_at")

  def created_by = column[Option[Long]]("created_by")

  def updated_by = column[Option[Long]]("updated_by")

  override def * =
    (id, user_id, date, start_time, end_time, device_info, created_at, updated_at, created_by, updated_by) <> ((TimelogData.apply _).tupled, TimelogData.unapply)
}


case class TimelogForm(id: Option[Int], user_id: Int, date: Long, start_time: Long, end_time: Long, device_info: String)
object TimelogForm {
  implicit val reader = Json.reads[TimelogForm]
  implicit val writer = Json.writes[TimelogForm]

}


class TimelogFormDef(tag: Tag) extends Table[TimelogForm](tag, "time_logs") {
  def id = column[Option[Int]]("id", O.PrimaryKey, O.AutoInc)

  def user_id = column[Int]("user_id")

  def date = column[Long]("date")

  def start_time = column[Long]("start_time")

  def end_time = column[Long]("end_time")

  def device_info = column[String]("device_info")

  override def * =
    (id, user_id, date, start_time, end_time, device_info) <> ((TimelogForm.apply _).tupled, TimelogForm.unapply)
}


class Timelog @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)
                       (implicit executionContext: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile] {

  private val TimelogForm = TableQuery[TimelogFormDef]

  private val TimelogTable = TableQuery[TimelogTableDef]

  def insert(timelogData: TimelogData): Future[Int] = {
    db.run(TimelogTable += timelogData)
  }

  def delete(timelogId: Int) = {
    db.run(TimelogTable.filter(_.id === timelogId).delete)
  }

  def update(timelogForm: TimelogForm) = {
    val q = TimelogForm.filter(_.id === timelogForm.id).update(timelogForm)
    db.run(q)
  }
}
