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
case class WorkingTimeData(id: Int, day: Int, start_time: Time, end_time: Time )

class WorkingTimeTableDef(tag: Tag) extends Table[WorkingTimeData](tag, "working_time") {
  def id = column[Int]("id", O.PrimaryKey,O.AutoInc)
  def day = column[Int]("day")
  def start_time = column[Time]("start_time")
  def end_time = column[Time]("end_time")
  override def * =
    (id, day, start_time, end_time) <> ((WorkingTimeData.apply _).tupled, WorkingTimeData.unapply)
}

/***/
case class WorkingTimeForm(id : Option[Int],day: Int, start_time: String, end_time: String)

object WorkingTimeForm {
  implicit val reader = Json.reads[WorkingTimeForm]
  implicit val writes = Json.writes[WorkingTimeForm]

}

class WorkingTime @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)
                          (implicit executionContext: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile] {
  private val WorkingTimeTable = TableQuery[WorkingDayTableDef]
  def insert(workingDayData: WorkingDayData): Future[Int] = {
    db.run(WorkingTimeTable += workingDayData)
  }

  def delete(WorkingTimeId: Int) = {
    db.run(WorkingTimeTable.filter(_.id === WorkingTimeId).delete)
  }

  def update(WorkingTimeData: WorkingDayData) = {
    db.run(WorkingTimeTable.filter(_.id === WorkingTimeData.id)
      .map(p => ( p.day, p.start_time, p.end_time))
      .update( WorkingTimeData.day, WorkingTimeData.start_time, WorkingTimeData.end_time))
  }
}
