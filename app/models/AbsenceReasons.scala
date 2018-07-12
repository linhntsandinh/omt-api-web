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
case class AbsenceReasonsData(id: Int, title: String, isSalary: Int)
object AbsenceReasonsData {
  implicit val reader = Json.reads[AbsenceApplicationsData]
  implicit val writer = Json.writes[AbsenceApplicationsData]

}
class AbsenceReasonsTableDef(tag: Tag) extends Table[AbsenceReasonsData](tag, "absence_reasons") {
  def id = column[Int]("id", O.PrimaryKey,O.AutoInc)
  def title = column[String]("title")
  def isSalary = column[Int]("is_salary")
  override def * =
    (id, title, isSalary) <>((AbsenceReasonsData.apply _).tupled, AbsenceReasonsData.unapply)
}

case class AbsenceReasonsForm( title: String, isSalary: Int)
object AbsenceReasonsForm {
  implicit val reader = Json.reads[AbsenceReasonsForm]
  implicit val writes = Json.writes[AbsenceReasonsForm]
}
class AbsenceReasonsFormTableDef(tag: Tag) extends Table[AbsenceReasonsForm](tag, "absence_applications") {
  def title = column[String]("title")
  def isSalary = column[Int]("is_salary")
  override def * =
    (title,isSalary) <>((AbsenceReasonsForm.apply _).tupled, AbsenceReasonsForm.unapply)
}
class AbsenceReasons  @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)
                                (implicit executionContext: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile] {
  private val AbsenceReasonsTable = TableQuery[AbsenceReasonsTableDef]


}
