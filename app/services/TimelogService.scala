package services

import javax.inject.Inject
import models.{Timelog, TimelogData, TimelogForm}

import scala.concurrent.Future

class TimelogService @Inject()(timelog: Timelog){
  def delete(id: Int): Future[Int] = timelog.delete(id)

  def insert(timelogForm: TimelogForm): Future[Int] = {
    val profileData = new TimelogData(null,
      timelogForm.user_id,
      timelogForm.date,
      timelogForm.start_time,
      timelogForm.end_time,
      timelogForm.device_info,
      Some(System.currentTimeMillis() / 1000),
      null,
      null,
      null
    )
    timelog.insert(profileData)
  }

  def update(timelogData: TimelogForm): Future[Int] = timelog.update(timelogData)
}
