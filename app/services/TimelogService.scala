package services

import java.sql.{Date, Time}
import java.text.SimpleDateFormat

import javax.inject.Inject
import models._
import play.api.libs.json.Json
import play.api.mvc.Result
import slick.lifted.TableQuery
import utils.JS
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class TimelogService @Inject()(timelog: Timelog){
  def delete(id: Int): Future[Int] = timelog.delete(id)
  def insert(timelogForm: TimelogForm): Future[Result] = {
    val sdf1 = new SimpleDateFormat("dd-MM-yyyy")
    val sdf2 = new SimpleDateFormat("HH:mm:ss")

    val sqlDate = new Date(sdf1.parse(timelogForm.date).getTime)
    val sqlStartTime = new Time(sdf2.parse(timelogForm.start_time).getTime)
    val sqlEndTime = new Time(sdf2.parse(timelogForm.end_time).getTime)

    val profileData = new TimelogData(null,
      timelogForm.user_id,
      sqlDate,
      sqlStartTime,
      sqlEndTime,
      timelogForm.device_info,
      Some(System.currentTimeMillis() / 1000),
      null,
      null,
      null
    )
    timelog.insert(profileData)
  }

  def update(timelogData: TimelogForm): Future[Int] = timelog.update(timelogData)

  def load(timeLogRequestLoad: TimelogLoadRequest): Future[Result] = {
    val load = timelog.load(timeLogRequestLoad)
    load.map{
      case Some(x) => {
        println(x._1)
        JS.OK("data"->Json.toJson(x._1),"length" -> Json.toJson(x._2))
      }
      case None => JS.KO("Không có đơn nào hợp lệ!")
    }
  }
}
