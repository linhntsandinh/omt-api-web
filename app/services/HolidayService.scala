
package services

import javax.inject.Inject
import models._
import play.api.mvc.Result

import scala.concurrent.Future

class HolidayService @Inject()(holiday: Holiday){
  def deleteByRoleId(id: Int) = holiday.delete(id)
  def insert(holidayForm: HolidayForm)= {
    val holidayData = new HolidayData(1,holidayForm.start_date,holidayForm.end_date,holidayForm.types,holidayForm.is_salary)
    holiday.insert(holidayData)
  }
  def update(holidayData: HolidayData) = {
    holiday.update(holidayData)
  }
}
