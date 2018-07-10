package models


import javax.inject.Inject
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json.Json
import slick.jdbc.JdbcProfile
import slick.jdbc.MySQLProfile.api._

import scala.concurrent.ExecutionContext
class AbsenceApplications class User @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)
                                               (implicit executionContext: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile] {
  private val AbsenceTable  = TableQuery[AbsenceApplicationsTableDef]
  def load(userId: Int) ={
    db.run(AbsenceTable.filter(_.id === userId).result)
  }
}
  case class AbsenceApplicationsData(id: Int, reasonId: Int, description: String, startTime: Int, endTime: Int, status:String, userId:Int, totalTime:Float, updated_at: Option[Int], update_by: Option[Int], created_by: Option[Int], updated_by: Option[Int])
  object AbsenceApplicationsData {
    implicit val reader = Json.reads[AbsenceApplicationsData]
    implicit val writes = Json.writes[AbsenceApplicationsData]

  }
  class AbsenceApplicationsTableDef(tag: Tag) extends Table[AbsenceApplicationsData](tag, "time_logs") {
    def id = column[Int]("id", O.PrimaryKey,O.AutoInc)
    def reasonId = column[Int]("reason_id")
    def description = column[String]("date")
    def startTime = column[Int]("start_time")
    def endTime = column[Int]("end_time")
    def status = column[String]("status")
    def userId = column[Int]("user_id")
    def totalTime = column[Float]("total_time")
    def created_at = column[Option[Int]]("created_at")
    def updated_at = column[Option[Int]]("updated_at")
    def created_by = column[Option[Int]]("created_by")
    def updated_by = column[Option[Int]]("updated_by")
    override def * =
      (id, reasonId, description, startTime, endTime, status, userId, totalTime, created_at, updated_at, created_by, updated_by) <>((AbsenceApplicationsData.apply _).tupled, AbsenceApplicationsData.unapply)
  }

  case class AbsenceApplicationsForm(reasonId: Int, description: String, startTime: Int, endTime: Int, status:String, userId:Int, totalTime:Float)
  object AbsenceApplicationsForm {
    implicit val reader = Json.reads[AbsenceApplicationsForm]
    implicit val writes = Json.writes[AbsenceApplicationsForm]
  }
  class TimeLogFormTableDef(tag: Tag) extends Table[AbsenceApplicationsForm](tag, "time_logs") {
    def reasonId = column[Int]("reason_id")
    def description = column[String]("description")
    def startTime = column[Int]("start_time")
    def endTime = column[Int]("end_time")
    def status = column[String]("status")
    def userId = column[Int]("user_id")
    def totalTime = column[Float]("total_time")
    override def * =
      (reasonId, description, startTime, endTime, status, userId, totalTime) <>((AbsenceApplicationsForm.apply _).tupled, AbsenceApplicationsForm.unapply)
  }

