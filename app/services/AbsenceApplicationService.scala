package services


import javax.inject.Inject
import models._
import play.api.libs.json.Json
import play.api.mvc.Result
import utils.JS

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future


class AbsenceApplicationService @Inject() (absence : AbsenceApplications){
  def load(id: Int): Future[Result] = {
    val load = absence.load(id)
    load.map{
      case Some(x) => {
        val js = Json.toJson(x)
        JS.OK("value"->js)
      }
      case None => JS.KO("Không có đơn nào hợp lệ!")
    }
  }
  def insert(absenceApplicationsForm: AbsenceApplicationsForm): Future[Int] = {
    val result : AbsenceApplicationsData= new AbsenceApplicationsData(1,absenceApplicationsForm.reasonId, absenceApplicationsForm.description, absenceApplicationsForm.startTime, absenceApplicationsForm.endTime, absenceApplicationsForm.status, absenceApplicationsForm.userId, absenceApplicationsForm.totalTime,Some(11111),Some(1),Some(1),Some(1))

    absence.insert(result)
  }
}
