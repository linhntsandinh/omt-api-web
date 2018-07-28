
package services
import javax.inject.Inject
import models._
import play.api.mvc.Result

import scala.concurrent.Future

class HolidayService @Inject()(holiday: Holiday){
  def deleteByRoleId(id: Int): Future[Result] = holiday.delete(id)
  def insert(holidayData: HolidayData): Future[Result] = {
    holiday.insert(holidayData)
  }
  def update(holidayData: HolidayData): Future[Result] = {
    holiday.update(holidayData)
  }
}
