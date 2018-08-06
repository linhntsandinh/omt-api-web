package models

import java.sql.{Date, Time}
import java.text.SimpleDateFormat

import javax.inject.Inject
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json._
import play.api.mvc.Result
import slick.jdbc.JdbcProfile
import slick.jdbc.MySQLProfile.api._
import slick.lifted.TableQuery
import utils.JS

import scala.collection.mutable.ListBuffer
import scala.concurrent.{ExecutionContext, Future}


case class TimelogData(id: Option[Int], user_id: Int, date: Date, start_time: Time, end_time: Time, device_info: String, created_at: Option[Long], updated_at: Option[Long], created_by: Option[Long], updated_by: Option[Long])

class TimelogTableDef(tag: Tag) extends Table[TimelogData](tag, "time_logs") {
  def id = column[Option[Int]]("id", O.PrimaryKey, O.AutoInc)

  def user_id = column[Int]("user_id")

  def date = column[Date]("date")

  def start_time = column[Time]("start_time")

  def end_time = column[Time]("end_time")

  def device_info = column[String]("device_info")

  def created_at = column[Option[Long]]("created_at")

  def updated_at = column[Option[Long]]("updated_at")

  def created_by = column[Option[Long]]("created_by")

  def updated_by = column[Option[Long]]("updated_by")

  override def * =
    (id, user_id, date, start_time, end_time, device_info, created_at, updated_at, created_by, updated_by) <> (TimelogData.tupled, TimelogData.unapply)
}


case class TimelogForm(id: Option[Int], user_id: Int, date: String, start_time: String, end_time: String, device_info: String,created_by: Option[Long],updated_by: Option[Long])

object TimelogForm {
  implicit val reader = Json.reads[TimelogForm]
  implicit val writer = Json.writes[TimelogForm]

}

class TimelogFormDef(tag: Tag) extends Table[TimelogForm](tag, "time_logs") {

  def id = column[Option[Int]]("id", O.PrimaryKey, O.AutoInc)

  def user_id = column[Int]("user_id")

  def date = column[String]("date")

  def start_time = column[String]("start_time")

  def end_time = column[String]("end_time")

  def device_info = column[String]("device_info")

  def created_by = column[Option[Long]]("created_by")

  def updated_by = column[Option[Long]]("updated_by")

  override def * =
    (id, user_id, date, start_time, end_time, device_info, created_by, updated_by) <> ((TimelogForm.apply _).tupled, TimelogForm.unapply)
}


case class TimelogLoadRequest(id: Option[Int], user_name: String,job_title: String ,date: String,offset :Int,limit :Int)
object TimelogLoadRequest{
  implicit val reader = Json.reads[TimelogLoadRequest]
  implicit val writer = Json.writes[TimelogLoadRequest]
}

case class TimelogLoad(id: Option[Int], user_name: String, job_title: String, check_in: String, check_out: String, date: String)
object TimelogLoad {
  implicit val reader = Json.reads[TimelogLoad]
  implicit val writer = Json.writes[TimelogLoad]
}

class Timelog @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)
                       (implicit executionContext: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile] {

  private val TimelogForm = TableQuery[TimelogFormDef]

  private val TimelogTable = TableQuery[TimelogTableDef]

  private val ProfileTable = TableQuery[ProfileTableDef]

  private val TitleTable = TableQuery[TitleTableDef]

  def insert(timelogData: TimelogData): Future[Int] = {
    db.run(TimelogTable += timelogData)
  }

  def delete(timelogId: Int) = {
    db.run(TimelogTable.filter(_.id === timelogId).delete)
  }

  def update(timelogData: TimelogData) = {
    val q = TimelogTable.filter(_.id === timelogData.id)
      .map(p => (p.user_id, p.date, p.start_time, p.end_time, p.device_info, p.updated_at, p.updated_by))
      .update(timelogData.user_id, timelogData.date, timelogData.start_time, timelogData.end_time, timelogData.device_info, timelogData.updated_at, timelogData.updated_by)
    db.run(q)
  }


  def load(timelogLoadRequest: TimelogLoadRequest):Future[Option[(ListBuffer[TimelogLoad],Int)]] = {
    val listLoad : ListBuffer[TimelogLoad] = new ListBuffer[TimelogLoad]
    val q = ((TimelogTable join ProfileTable).on(_.user_id === _.user_id) join TitleTable).on(_._2.job_title_id === _.id)
        .filter(row =>
          if(timelogLoadRequest.user_name !="") row._1._2.full_name === timelogLoadRequest.user_name
          else LiteralColumn(true)
        ).filter(row =>
          if(timelogLoadRequest.job_title !="") row._2.title === timelogLoadRequest.job_title
          else LiteralColumn(true)
        ).filter(row =>
          if(timelogLoadRequest.date != "") {
            val sdf1 = new SimpleDateFormat("dd-MM-yyyy")
            val sqlDate = new Date(sdf1.parse(timelogLoadRequest.date).getTime)
            row._1._1.date === sqlDate
          }
          else LiteralColumn(true)
        ).drop(timelogLoadRequest.offset).take(timelogLoadRequest.limit).result
    val rs = db.run(q)
    val p = ((TimelogTable join ProfileTable).on(_.user_id === _.user_id) join TitleTable).on(_._2.job_title_id === _.id)
      .filter(row =>
        if(timelogLoadRequest.user_name !="") row._1._2.full_name === timelogLoadRequest.user_name
        else LiteralColumn(true)
      ).filter(row =>
      if(timelogLoadRequest.job_title !="") row._2.title === timelogLoadRequest.job_title
      else LiteralColumn(true)
    ).filter(row =>
      if(timelogLoadRequest.date != "") {
        val sdf1 = new SimpleDateFormat("dd-MM-yyyy")
        val sqlDate = new Date(sdf1.parse(timelogLoadRequest.date).getTime)
        row._1._1.date === sqlDate
      }
      else LiteralColumn(true)
    ).result
    val rss = db.run(p)
    for{
      fs <- rs
      fs1 <- rss
    } yield {
      fs.foreach(
        item=>{
          val itemLoad : TimelogLoad = new TimelogLoad(item._1._1.id,item._1._2.full_name,item._2.title,item._1._1.start_time.toString,item._1._1.end_time.toString,item._1._1.date.toString)
          listLoad += itemLoad
        }
      )
      Some(listLoad,fs1.size)
    }
  }
}
