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
case class AbsenceReasonsData(id: Int, title: String, isSalary: Boolean)
object AbsenceReasonsData {
  implicit val reader = Json.reads[AbsenceReasonsData]
  implicit val writer = Json.writes[AbsenceReasonsData]

}
class AbsenceReasonsTableDef(tag: Tag) extends Table[AbsenceReasonsData](tag, "absence_reasons") {
  def id = column[Int]("id", O.PrimaryKey,O.AutoInc)
  def title = column[String]("title")
  def isSalary = column[Boolean]("is_salary")
  override def * =
    (id, title, isSalary) <>((AbsenceReasonsData.apply _).tupled, AbsenceReasonsData.unapply)
}

case class AbsenceReasonsForm( title: String, isSalary: Boolean)
object AbsenceReasonsForm {
  implicit val reader = Json.reads[AbsenceReasonsForm]
  implicit val writes = Json.writes[AbsenceReasonsForm]
}
class AbsenceReasons  @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)
                                (implicit executionContext: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile] {
  private val AbsenceReasonsTable = TableQuery[AbsenceReasonsTableDef]
  def insert(result: AbsenceReasonsData): Future[Int] = {
    db.run(AbsenceReasonsTable += result)
  }
  def delete(Id: Int): Future[Int] = {
    db.run(AbsenceReasonsTable.filter(_.id === Id).delete)
  }
  def update(absenceReasonsData: AbsenceReasonsData)={
    val q = AbsenceReasonsTable.filter(_.id === absenceReasonsData.id)
      .map(p => (p.title,p.isSalary))
      .update((absenceReasonsData.title,absenceReasonsData.isSalary))
    db.run(q)
  }
}
