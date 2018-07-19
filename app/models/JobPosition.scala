package models

import javax.inject.Inject
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json.Json
import slick.jdbc.JdbcProfile
import slick.jdbc.MySQLProfile.api._

import scala.concurrent.ExecutionContext

case class JobPositionData(id: Option[Int], title: String)
object JobPositionData {
  implicit val reader = Json.reads[JobPositionData]
  implicit val writer = Json.writes[JobPositionData]
}

class JobPositionDef(tag: Tag) extends Table[JobPositionData](tag, "job_position") {
  def id = column[Option[Int]]("id", O.PrimaryKey,O.AutoInc)
  def title = column[String]("title")
  override def * =
    (id, title) <>((JobPositionData.apply _).tupled, JobPositionData.unapply)
}


class JobPosition @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)
                    (implicit executionContext: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile] {

}
