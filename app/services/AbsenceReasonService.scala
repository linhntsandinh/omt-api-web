package services

import javax.inject.Inject
import models._

import scala.concurrent.Future


class AbsenceReasonService@Inject() (absenceReasons : AbsenceReasons){

  def insert(absenceReasonsForm: AbsenceReasonsForm): Future[Int] = {
    val result : AbsenceReasonsData= new AbsenceReasonsData(1,absenceReasonsForm.title,absenceReasonsForm.isSalary)

    absenceReasons.insert(result)
  }
  def update(absenceReasonsData: AbsenceReasonsData): Future[Int] = {
    absenceReasons.update(absenceReasonsData)
  }

  def delete(id: Int): Future[Int] = absenceReasons.delete(id)
}

