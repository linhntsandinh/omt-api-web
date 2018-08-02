package services

import javax.inject.Inject
import models._
import play.api.libs.json.Json
import play.api.mvc.Result
import utils.JS

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future


class AbsenceApplicationService @Inject() (absence : AbsenceApplications){
  def load(absenceRequestLoad: AbsenceRequestLoad): Future[Result] = {
    val load = absence.load(absenceRequestLoad)
    load.map{
      case Some(x) => {
        println(x._1)
        JS.OK("data"->Json.toJson(x._1),"length" -> Json.toJson(x._2))
      }
      case None => JS.KO("Không có đơn nào hợp lệ!")
    }
  }
  def insert(absenceApplicationsForm: AbsenceApplicationsForm): Future[Int] = {
    val result : AbsenceApplicationsData=
      new AbsenceApplicationsData(1,absenceApplicationsForm.reasonId, absenceApplicationsForm.description, absenceApplicationsForm.startTime, absenceApplicationsForm.endTime, absenceApplicationsForm.status, absenceApplicationsForm.userId, absenceApplicationsForm.totalTime,Some(System.currentTimeMillis()/1000),Some(1),Some(1),Some(1))

    absence.insert(result,absenceApplicationsForm)
  }
  def loadForm(id : Int): Future[Result] =  {
    val load = absence.loadForm(id)
    load.map{
      case Some(x) => {
        println(x)
        JS.OK("Reasons"->Json.toJson(x._1), "Receiver"->Json.toJson(x._2) , "position"->Json.toJson(x._3._2),"title"->Json.toJson(x._3._1))
//
      }
      case None => JS.KO("Không có đơn nào hợp lệ!")
    }
  }
  def update(absenceApplicationsData: AbsenceApplicationsData): Future[Int] = absence.update(absenceApplicationsData)

  def delete(id: Int): Future[Int] = absence.delete(id)
  def loadDetail(id :Int): Future[Result]=  {
    val load = absence.loadDetail(id)
    load.map{
      case Some(x) => {
        println(x)
        JS.OK("data"->Json.toJson(x))
      }
      case None => JS.KO("Không có đơn nào hợp lệ!")
    }
  }
}
