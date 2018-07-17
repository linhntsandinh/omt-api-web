package models

import play.api.libs.json.Json


import javax.inject.Inject
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json.Json
import play.api.mvc.Result
import slick.jdbc.JdbcProfile
import slick.jdbc.MySQLProfile.api._

import scala.collection.mutable.ListBuffer
import scala.concurrent.{ExecutionContext, Future}
case class AbsenceApproveData(id: Int, application_id: Int, types: Int, approve_id: Int, approve_time: Int,comment: Option[String],created_at: Option[Long], updated_at: Option[Long], created_by: Option[Int], update_by: Option[Int])
object AbsenceApproveData {
  implicit val reader = Json.reads[AbsenceApproveData]
  implicit val writer = Json.writes[AbsenceApproveData]
}
class AbsenceApproveTableDef(tag: Tag) extends Table[AbsenceApproveData](tag, "absence_application_approve") {
  def id = column[Int]("id", O.PrimaryKey,O.AutoInc)
  def application_id = column[Int]("application_id")
  def types = column[Int]("type")
  def approve_id = column[Int]("approver_id")
  def approve_time = column[Int]("approve_time")
  def comment = column[Option[String]]("comment")
  def created_at = column[Option[Long]]("created_at")
  def updated_at = column[Option[Long]]("updated_at")
  def created_by = column[Option[Int]]("created_by")
  def updated_by = column[Option[Int]]("updated_by")
  override def * =
    (id, application_id, types, approve_id, approve_time,comment,created_at, updated_at, created_by, updated_by) <>((AbsenceApproveData.apply _).tupled, AbsenceApproveData.unapply)
}

case class AbsenceApproveForm(application_id: Int, types: Int, approve_id: Int, approve_time: Int,comment: Option[String],update_by: Option[Int],create_by: Option[Int])
object AbsenceApproveForm {
  implicit val reader = Json.reads[AbsenceApproveForm]
  implicit val writes = Json.writes[AbsenceApproveForm]
}
class AbsenceApprove  @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)
                                (implicit executionContext: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile] {
  private val AbsenceApproveTable = TableQuery[AbsenceApproveTableDef]
  def insert(result: AbsenceApproveData): Future[Int] = {
    db.run(AbsenceApproveTable += result)
  }
  def delete(Id: Int): Future[Int] = {
    db.run(AbsenceApproveTable.filter(_.id === Id).delete)
  }
  def update(absenceApproveData: AbsenceApproveData)={
    val q = AbsenceApproveTable.filter(_.id === absenceApproveData.id)
      .map(p => (p.approve_id,p.application_id,p.types,p.approve_time,p.comment,p.updated_by))
      .update((absenceApproveData.approve_id,absenceApproveData.application_id,absenceApproveData.types,absenceApproveData.approve_time,absenceApproveData.comment,absenceApproveData.update_by))
    db.run(q)
  }
}
