package services

import java.sql.{Date, Time}
import java.text.SimpleDateFormat

import javax.inject.Inject
import models.{Timelog, TimelogData, TimelogForm}

import scala.concurrent.Future

class TimelogService @Inject()(timelog: Timelog){
  def delete(id: Int): Future[Int] = timelog.delete(id)

  def insert(timelogForm: TimelogForm): Future[Int] = {
    val sdf1 = new SimpleDateFormat("dd-MM-yyyy")
    val sdf2 = new SimpleDateFormat("HH:mm:ss")

    val sqlDate = new Date(sdf1.parse(timelogForm.date).getTime)
    val sqlStartTime = new Time(sdf2.parse(timelogForm.start_time).getTime)
    val sqlEndTime = new Time(sdf2.parse(timelogForm.end_time).getTime)

    val timelogData = new TimelogData(null,
      timelogForm.user_id,
      sqlDate,
      sqlStartTime,
      sqlEndTime,
      timelogForm.device_info,
      Some(System.currentTimeMillis() / 1000),
      Some(System.currentTimeMillis() / 1000),
      timelogForm.created_by,
      timelogForm.updated_by
    )
    timelog.insert(timelogData)
  }

  def update(timelogForm: TimelogForm): Future[Int] = {
    val sdf1 = new SimpleDateFormat("dd-MM-yyyy")
    val sdf2 = new SimpleDateFormat("HH:mm:ss")

    val sqlDate = new Date(sdf1.parse(timelogForm.date).getTime)
    val sqlStartTime = new Time(sdf2.parse(timelogForm.start_time).getTime)
    val sqlEndTime = new Time(sdf2.parse(timelogForm.end_time).getTime)

    val timelogData = new TimelogData(null,
      timelogForm.user_id,
      sqlDate,
      sqlStartTime,
      sqlEndTime,
      timelogForm.device_info,
      null,
      Some(System.currentTimeMillis() / 1000),
      timelogForm.created_by,
      timelogForm.updated_by
    )
    timelog.update(timelogData)
  }
}
