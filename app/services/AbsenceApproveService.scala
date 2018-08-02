package services

import javax.inject.Inject
import models._

import scala.concurrent.Future


class AbsenceApproveService@Inject() (absenceApprove : AbsenceApprove){

  def insert(absenceApproveForm: AbsenceApproveForm): Future[Int] = {
    val result : AbsenceApproveData= new AbsenceApproveData(1,absenceApproveForm.application_id, absenceApproveForm.types,absenceApproveForm.approve_id, absenceApproveForm.approve_time ,absenceApproveForm.comment, Some(System.currentTimeMillis()/1000), null, absenceApproveForm.create_by, null)
    absenceApprove.insert(result)
  }
  def update(absenceApproveData: AbsenceApproveData): Future[Int] = {
    absenceApprove.update(absenceApproveData)
  }

  def delete(id: Int): Future[Int] = absenceApprove.delete(id)
}
