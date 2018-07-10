package services

import javax.inject.Inject
import models.{AbsenceApplications, User}

import scala.concurrent.Future

class AbsenceApplicationService @Inject() (absence : AbsenceApplications){
  def load(id: Int): Future[Int] = absence.load(id)
}
