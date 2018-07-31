package services

import java.sql.Time
import java.text.SimpleDateFormat

import javax.inject.Inject
import models.{UserRoleData, WorkingDay, WorkingDayData, WorkingDayForm}
import play.api.mvc.Result

import scala.concurrent.Future

class WorkingDayService @Inject()(workingday: WorkingDay) {
  def insert(workingdayForm: WorkingDayForm)= {
    val sdf2 = new SimpleDateFormat("HH:mm:ss")
    val sqlStartTime = new Time(sdf2.parse(workingdayForm.start_time).getTime)
    val sqlEndTime = new Time(sdf2.parse(workingdayForm.end_time).getTime)
    val workingdayData = new WorkingDayData(
      0,
      workingdayForm.day,
      sqlStartTime,
      sqlEndTime
    )
    workingday.insert(workingdayData)
  }
  def update(workingdayForm: WorkingDayForm)= {
    val sdf2 = new SimpleDateFormat("HH:mm:ss")
    val sqlStartTime = new Time(sdf2.parse(workingdayForm.start_time).getTime)
    val sqlEndTime = new Time(sdf2.parse(workingdayForm.end_time).getTime)
    val workingdayData = new WorkingDayData(
      1,
      workingdayForm.day,
      sqlStartTime,
      sqlEndTime
    )

    workingday.update(workingdayData)
  }

  def delete(workingDayId: Int): Future[Int] = workingday.delete(workingDayId)

}
