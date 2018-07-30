package services

import java.sql.Date
import java.text.SimpleDateFormat

import javax.inject.Inject
import models.{Profile, ProfileData, ProfileForm}
import play.api.libs.json.Json
import play.api.mvc.Result
import utils.JS

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class ProfileService @Inject()(profile: Profile) {
  def delete(id: Int): Future[Int] = profile.delete(id)

  def getProfile(id: Int): Future[Result] = {
    val result = profile.getProfile(id)
    result.map{
      case Some(x) => {
        JS.OK("profile" -> Json.toJson(x._1), "job_position" -> Json.toJson(x._2), "job_title" -> Json.toJson(x._3))
      }
      case None => JS.KO("Khong tim thay profile.")
    }
  }

  def insert(profileForm: ProfileForm): Future[Result] = {
    val sdf1 = new SimpleDateFormat("dd-MM-yyyy")

    val sqlBirthDate = new Date(sdf1.parse(profileForm.birth_date).getTime)
    val sqlJoinDate = new Date(sdf1.parse(profileForm.join_date).getTime)
    val profileData = new ProfileData(null,
      profileForm.user_id,
      profileForm.full_name,
      profileForm.phone_number,
      sqlBirthDate,
      profileForm.address,
      profileForm.departmenti_id,
      profileForm.job_title_id,
      profileForm.job_position_id,
      profileForm.status,
      sqlJoinDate,
      profileForm.gender,
      Some(System.currentTimeMillis() / 1000),
      Some(System.currentTimeMillis() / 1000),
      profileForm.created_by,
      null
    )
    profile.insert(profileData)
  }

  def update(profileForm: ProfileForm): Future[Result] = {
    val sdf1 = new SimpleDateFormat("dd-MM-yyyy")

    val sqlBirthDate = new Date(sdf1.parse(profileForm.birth_date).getTime)
    val sqlJoinDate = new Date(sdf1.parse(profileForm.join_date).getTime)

    val profileData = new ProfileData(profileForm.id,
      profileForm.user_id,
      profileForm.full_name,
      profileForm.phone_number,
      sqlBirthDate,
      profileForm.address,
      profileForm.departmenti_id,
      profileForm.job_title_id,
      profileForm.job_position_id,
      profileForm.status,
      sqlJoinDate,
      profileForm.gender,
      null,
      Some(System.currentTimeMillis() / 1000),
      null,
      null
    )
    profile.update(profileData)
  }
}
