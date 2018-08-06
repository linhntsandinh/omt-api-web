package services

import javax.inject.Inject
import models.{JobTitle, TitleData}
import play.api.mvc.Result
import utils.JS

import scala.concurrent.Future

class JobTitleService @Inject()(jobTitle: JobTitle){
  def delete(id: Int)= jobTitle.delete(id)
  def insert(titleData: TitleData)= {
    jobTitle.insert(titleData)
  }
  def update(titleData: TitleData)= {
    jobTitle.update(titleData)
  }
}
