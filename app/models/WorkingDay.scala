package models

import java.sql.Time

import javax.inject.Inject
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json.Json
import play.api.mvc.Result
import utils.JS

import scala.concurrent.{ExecutionContext, Future}
import slick.jdbc.JdbcProfile
import slick.jdbc.MySQLProfile.api._
import slick.lifted.TableQuery
import utils.JS.OK

/***/
case class WorkingDayData(id: Int, day: Int, start_time: Time, end_time: Time )

class WorkingDayTableDef(tag: Tag) extends Table[WorkingDayData](tag, "working_day") {
  def id = column[Int]("id", O.PrimaryKey,O.AutoInc)
  def day = column[Int]("day")
  def start_time = column[Time]("start_time")
  def end_time = column[Time]("end_time")
  override def * =
    (id, day, start_time, end_time) <> ((WorkingDayData.apply _).tupled, WorkingDayData.unapply)
}

/***/
case class WorkingDayForm(id : Option[Int],day: Int, start_time: String, end_time: String)

object WorkingDayForm {
  implicit val reader = Json.reads[WorkingDayForm]
  implicit val writes = Json.writes[WorkingDayForm]

}

class WorkingDay @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)
                          (implicit executionContext: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile] {
  private val WorkingDayTable = TableQuery[WorkingDayTableDef]
  def insert(workingDayData: WorkingDayData): Future[Int] = {
    db.run(WorkingDayTable += workingDayData)
  }

  def delete(workingDayId: Int) = {
    db.run(WorkingDayTable.filter(_.id === workingDayId).delete)
  }

  def update(workingDayData: WorkingDayData) = {
     db.run(WorkingDayTable.filter(_.id === workingDayData.id)
      .map(p => ( p.day, p.start_time, p.end_time))
      .update( workingDayData.day, workingDayData.start_time, workingDayData.end_time))
  }
}
