package models

import javax.inject.Inject
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json.Json
import slick.jdbc.JdbcProfile
import slick.jdbc.MySQLProfile.api._

import scala.concurrent.ExecutionContext

case class JobTitleData(id: Option[Int], title: String)
object JobTitleData {
  implicit val reader = Json.reads[JobTitleData]
  implicit val writer = Json.writes[JobTitleData]
}

class JobTitleDef(tag: Tag) extends Table[JobTitleData](tag, "job_title") {
  def id = column[Option[Int]]("id", O.PrimaryKey,O.AutoInc)
  def title = column[String]("title")
  override def * =
    (id, title) <>((JobTitleData.apply _).tupled, JobTitleData.unapply)
}


class JobTitle @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)
                           (implicit executionContext: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile] {

}
