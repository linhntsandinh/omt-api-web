package models


import javax.inject.Inject
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json.Json
import play.api.mvc.Result
import slick.jdbc.JdbcProfile
import slick.jdbc.MySQLProfile.api._

import scala.collection.mutable.ListBuffer
import scala.concurrent.{ExecutionContext, Future}
class AbsenceApplications @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)
                                               (implicit executionContext: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile] {
  private val AbsenceTable = TableQuery[AbsenceApplicationsTableDef]
  private val AbsenceReasonsTable = TableQuery[AbsenceReasonsTableDef]

  def load(userId: Int): Future[Option[ListBuffer[AbsenceApplicationsLoad]]] = {
    val listAbsence = ListBuffer.empty[AbsenceApplicationsLoad]
    val q = (AbsenceTable join AbsenceReasonsTable).on(_.reasonId === _.id).filter(_._1.userId === userId).result

    //
    val rs = db.run {
      q
    }
    rs.map {
      list => {
        list.size match {
          case 0 => None
          case _ => {
            list.foreach{
              item => {
                val itemLoad : AbsenceApplicationsLoad = new AbsenceApplicationsLoad(item._1.id,item._2.title,item._1.description,"dsa",12,12,item._1.status)
                listAbsence += itemLoad
              }
            }
            Some(listAbsence)
          }
        }
      }
    }
  }
  def insert(result: AbsenceApplicationsData): Future[Int] = {
    db.run(AbsenceTable += result)
  }
  def delete(Id: Int): Future[Int] = {
    db.run(AbsenceTable.filter(_.id === Id).delete)
  }
  def update(absenceApplicationsData: AbsenceApplicationsData)={
    val q = AbsenceTable.filter(_.id === absenceApplicationsData.id).update(absenceApplicationsData)
    db.run(q)
  }
}
  case class AbsenceApplicationsLoad(id: Int, resonTitle: String, from: String,to: String,startTime :Int,absenceDay :Int,statuse :Int)
  object AbsenceApplicationsLoad {
    implicit val reader = Json.reads[AbsenceApplicationsLoad]
    implicit val writer = Json.writes[AbsenceApplicationsLoad]
  }
  case class AbsenceApplicationsData(id: Int, reasonId: Int, description: String, startTime: Int, endTime: Int, status:Int, userId:Int, totalTime:Float, created_at: Option[Long], updated_at: Option[Long], update_by: Option[Int], created_by: Option[Int])
  object AbsenceApplicationsData {
    implicit val reader = Json.reads[AbsenceApplicationsData]
    implicit val writer = Json.writes[AbsenceApplicationsData]

  }
  class AbsenceApplicationsTableDef(tag: Tag) extends Table[AbsenceApplicationsData](tag, "absence_applications") {
    def id = column[Int]("id", O.PrimaryKey,O.AutoInc)
    def reasonId = column[Int]("reason_id")
    def description = column[String]("description")
    def startTime = column[Int]("start_time")
    def endTime = column[Int]("end_time")
    def status = column[Int]("status")
    def userId = column[Int]("user_id")
    def totalTime = column[Float]("total_time")
    def created_at = column[Option[Long]]("created_at")
    def updated_at = column[Option[Long]]("updated_at")
    def created_by = column[Option[Int]]("created_by")
    def updated_by = column[Option[Int]]("updated_by")
    override def * =
      (id, reasonId, description, startTime, endTime, status, userId, totalTime, created_at, updated_at, updated_by, created_by) <>((AbsenceApplicationsData.apply _).tupled, AbsenceApplicationsData.unapply)
  }

  case class AbsenceApplicationsForm(reasonId: Int, description: String, startTime: Int, endTime: Int, status:Int, userId:Int, totalTime:Float)
  object AbsenceApplicationsForm {
    implicit val reader = Json.reads[AbsenceApplicationsForm]
    implicit val writes = Json.writes[AbsenceApplicationsForm]
  }
  class AbsenceApplicationFormTableDef(tag: Tag) extends Table[AbsenceApplicationsForm](tag, "absence_applications") {
    def reasonId = column[Int]("reason_id")
    def description = column[String]("description")
    def startTime = column[Int]("start_time")
    def endTime = column[Int]("end_time")
    def status = column[Int]("status")
    def userId = column[Int]("user_id")
    def totalTime = column[Float]("total_time")
    override def * =
      (reasonId, description, startTime, endTime, status, userId, totalTime) <>((AbsenceApplicationsForm.apply _).tupled, AbsenceApplicationsForm.unapply)
  }
