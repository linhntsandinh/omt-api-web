package services

import javax.inject.Inject
import models.{JobTitle, TitleData}
import play.api.mvc.Result
import utils.JS

import scala.concurrent.Future

class JobTitleService @Inject()(jobTitle: JobTitle){
  def delete(id: Int): Future[Result] = jobTitle.delete(id)
  def insert(titleData: TitleData): Future[Result] = {
    jobTitle.insert(titleData)
  }
  def update(titleData: TitleData): Future[Result] = {
    jobTitle.update(titleData)
  }
}
