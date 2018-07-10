package models



import javax.inject.Inject
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json.Json

import scala.concurrent.{ExecutionContext, Future}
import slick.jdbc.JdbcProfile
import slick.jdbc.MySQLProfile.api._

class TimeLog {
  case class TimeLogData(id: Int, userId: Int, date: Int, startTime: Int, endTime: Int, deviceInfo:String, updated_at: Option[Int], update_by: Option[Int], created_by: Option[Int], updated_by: Option[Int])
  object TimeLogData {
    implicit val reader = Json.reads[TimeLogData]
    implicit val writes = Json.writes[TimeLogData]

  }
  class TimeLogTableDef(tag: Tag) extends Table[TimeLogData](tag, "time_logs") {
    def id = column[Int]("id", O.PrimaryKey,O.AutoInc)
    def userId = column[Int]("user_id")
    def date = column[Int]("date")
    def startTime = column[Int]("start_time")
    def endTime = column[Int]("end_time")
    def deviceInfo = column[String]("device_info")
    def created_at = column[Option[Int]]("created_at")
    def updated_at = column[Option[Int]]("updated_at")
    def created_by = column[Option[Int]]("created_by")
    def updated_by = column[Option[Int]]("updated_by")
    override def * =
      (id, userId, date, startTime, endTime, deviceInfo, created_at, updated_at, created_by, updated_by) <>((TimeLogData.apply _).tupled, TimeLogData.unapply)
  }

  case class TimeLogForm(userId: Int, date: Int, startTime: Int, endTime: Int, deviceInfo:String)
  object TimeLogForm {
    implicit val reader = Json.reads[TimeLogForm]
    implicit val writes = Json.writes[TimeLogForm]

  }
  class TimeLogFormTableDef(tag: Tag) extends Table[TimeLogForm](tag, "time_logs") {
    def userId = column[Int]("user_id")
    def date = column[Int]("date")
    def startTime = column[Int]("start_time")
    def endTime = column[Int]("end_time")
    def deviceInfo = column[String]("device_info")
    override def * =
      (userId, date, startTime, endTime, deviceInfo) <>((TimeLogForm.apply _).tupled, TimeLogForm.unapply)
  }

}
