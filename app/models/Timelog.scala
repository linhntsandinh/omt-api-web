package models

import java.sql.{Date, Time}
import java.text.SimpleDateFormat
import java.time.{Instant, ZoneId, ZonedDateTime}

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


case class TimelogForm(id: Option[Int], user_id: Int, date: String, start_time: String, end_time: String, device_info: String, created_by: Option[Long], updated_by: Option[Long])

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


case class TimelogLoadRequest(id: Option[Int], user_name: String, job_title: String, date: String, offset: Int, limit: Int)

object TimelogLoadRequest {
  implicit val reader = Json.reads[TimelogLoadRequest]
  implicit val writer = Json.writes[TimelogLoadRequest]
}

case class TimelogLoad(id: Option[Int], user_name: String, job_title: String, check_in: String, check_out: String, date: String)

object TimelogLoad {
  implicit val reader = Json.reads[TimelogLoad]
  implicit val writer = Json.writes[TimelogLoad]
}

case class CountItem(id: Int, count: Double)

object CountItem {
  implicit val reader = Json.reads[CountItem]
  implicit val writer = Json.writes[CountItem]
}

case class NameItem(id: Option[Int], name: String)

object NameItem {
  implicit val reader = Json.reads[NameItem]
  implicit val writer = Json.writes[NameItem]
}

class Timelog @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)
                       (implicit executionContext: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile] {

  private val TimelogForm = TableQuery[TimelogFormDef]

  private val TimelogTable = TableQuery[TimelogTableDef]

  private val ProfileTable = TableQuery[ProfileTableDef]

  private val TitleTable = TableQuery[TitleTableDef]

  def insert(timelogData: TimelogData) = {
    db.run(TimelogTable returning TimelogTable.map(_.id) += timelogData)
    //    db.run(AbsenceTable returning AbsenceTable.map(_.id)+= result)
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


  def load(timelogLoadRequest: TimelogLoadRequest): Future[Option[(ListBuffer[TimelogLoad], Int)]] = {
    val listLoad: ListBuffer[TimelogLoad] = new ListBuffer[TimelogLoad]
    val q = ((TimelogTable join ProfileTable).on(_.user_id === _.user_id) join TitleTable).on(_._2.job_title_id === _.id)
      .filter(row =>
        if (timelogLoadRequest.user_name != "") row._1._2.full_name === timelogLoadRequest.user_name
        else LiteralColumn(true)
      ).filter(row =>
      if (timelogLoadRequest.job_title != "") row._2.title === timelogLoadRequest.job_title
      else LiteralColumn(true)
    ).filter(row =>
      if (timelogLoadRequest.date != "") {
        val sdf1 = new SimpleDateFormat("dd-MM-yyyy")
        val sqlDate = new Date(sdf1.parse(timelogLoadRequest.date).getTime)
        row._1._1.date === sqlDate
      }
      else LiteralColumn(true)
    ).drop(timelogLoadRequest.offset).take(timelogLoadRequest.limit).result
    val rs = db.run(q)
    val p = ((TimelogTable join ProfileTable).on(_.user_id === _.user_id) join TitleTable).on(_._2.job_title_id === _.id)
      .filter(row =>
        if (timelogLoadRequest.user_name != "") row._1._2.full_name === timelogLoadRequest.user_name
        else LiteralColumn(true)
      ).filter(row =>
      if (timelogLoadRequest.job_title != "") row._2.title === timelogLoadRequest.job_title
      else LiteralColumn(true)
    ).filter(row =>
      if (timelogLoadRequest.date != "") {
        val sdf1 = new SimpleDateFormat("dd-MM-yyyy")
        val sqlDate = new Date(sdf1.parse(timelogLoadRequest.date).getTime)
        row._1._1.date === sqlDate
      }
      else LiteralColumn(true)
    ).result
    val rss = db.run(p)
    for {
      fs <- rs
      fs1 <- rss
    } yield {
      fs.foreach(
        item => {
          val itemLoad: TimelogLoad = new TimelogLoad(item._1._1.id, item._1._2.full_name, item._2.title, item._1._1.start_time.toString, item._1._1.end_time.toString, item._1._1.date.toString)
          listLoad += itemLoad
        }
      )
      Some(listLoad, fs1.size)
    }
  }

  def count(date: String) = {
    val sdf1 = new SimpleDateFormat("dd-MM-yyyy")
    val sdf2 = new SimpleDateFormat("HH:mm:ss")
    val startTime: String = "09:00:00"
    val limitTime: String = "10:00:00"
    val endTime: String = "18:00:00"
    val sqlDate = new Date(sdf1.parse(date).getTime)
    val sqlStartTime = new Time(sdf2.parse(startTime).getTime)
    val sqlEndTime = new Time(sdf2.parse(endTime).getTime)
    val sqlLimitTime = new Time(sdf2.parse(limitTime).getTime)
    val monthFormat = new SimpleDateFormat("MM")
    val yearFormat = new SimpleDateFormat("yyyy")
    val sqlmonth = new Date(sdf1.parse("01-" + monthFormat.format(sqlDate) + "-" + yearFormat.format(sqlDate)).getTime)
    println(sqlmonth.toString)
    println(sqlLimitTime.toString)
    println(sqlDate.toString)
    val q = ((TimelogTable.filter(_.date <= sqlDate)).filter(_.date >= sqlmonth)).groupBy(_.user_id).map { case (c, tbl) =>
      (c, tbl.length)
    }.result
    val rs = db.run(q)

    val q1 = (ProfileTable).result
    val rs1 = db.run(q1)

    val q2 = (((TimelogTable.filter(_.start_time > sqlStartTime)).filter(_.date <= sqlDate)).filter(_.date >= sqlmonth)).groupBy(_.user_id).map { case (c, tbl) =>
      (c, tbl.length)
    }.result
    val rs2 = db.run(q2)

    val q3 = (((TimelogTable.filter(_.end_time < sqlEndTime)).filter(_.date <= sqlDate)).filter(_.date >= sqlmonth)).groupBy(_.user_id).map { case (c, tbl) =>
      (c, tbl.length)
    }.result
    val rs3 = db.run(q3)

    val q4 = (((TimelogTable.filter(_.date <= sqlDate)).filter(_.date >= sqlmonth)).filter(_.start_time > sqlLimitTime)).groupBy(_.user_id).map { case (c, tbl) =>
      (c, tbl.length)
    }.result
    val rs4 = db.run(q4)
    for {
      fs <- rs
      fs1 <- rs1
      fs2 <- rs2
      fs3 <- rs3
      fs4 <- rs4
    } yield {
      val cfs = ListBuffer.empty[CountItem]
      val cfs1 = ListBuffer.empty[NameItem]
      val cfs2 = ListBuffer.empty[CountItem]
      val cfs3 = ListBuffer.empty[CountItem]
      fs.foreach { x => {
        println(x._1 + " userid " + x._2)
        var half = false
        fs4.foreach { y => {
          if (x._1 == y._1) {
            half = true
            val item = new CountItem(x._1, (x._2 - (y._2.toDouble / 2)))
            cfs += item
            println(y._2 + " =")
          }
        }
        }
        if(half==false){
          val item = new CountItem(x._1, x._2.toDouble)
          cfs += item
          println(x._2)
        }
      }
      }
      fs1.foreach { x => {
        val item = new NameItem(x.id, x.full_name)
        cfs1 += item
      }
      }
      fs2.foreach { x => {
        val item = new CountItem(x._1, x._2)
        cfs2 += item
      }
      }
      fs3.foreach { x => {
        val item = new CountItem(x._1, x._2)
        cfs3 += item
      }
      }

      (cfs, cfs1, cfs2, cfs3)
    }

  }
}
