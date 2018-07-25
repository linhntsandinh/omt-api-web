package services

import java.sql.Date
import java.text.SimpleDateFormat

import javax.inject.Inject
import models.{Profile, ProfileData, ProfileForm}

import scala.concurrent.Future

class ProfileService @Inject()(profile: Profile) {
  def delete(id: Int): Future[Int] = profile.delete(id)

//  def getProfileAll(): Future[Int] = {
//    profile.
//  }

  def insert(profileForm: ProfileForm): Future[Int] = {
    val sdf1 = new SimpleDateFormat("dd-MM-yyyy")

    val sqlBirthDate = new Date(sdf1.parse(profileForm.birth_date).getTime)
    val sqlJoinDate = new Date(sdf1.parse(profileForm.join_date).getTime)
    val profileData = new ProfileData(null,
      profileForm.user_id,
      profileForm.full_name,
      profileForm.phone_number,
      sqlBirthDate,
      profileForm.address,
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

  def update(profileForm: ProfileForm): Future[Int] = {
    val sdf1 = new SimpleDateFormat("dd-MM-yyyy")

    val sqlBirthDate = new Date(sdf1.parse(profileForm.birth_date).getTime)
    val sqlJoinDate = new Date(sdf1.parse(profileForm.join_date).getTime)

    val profileData = new ProfileData(profileForm.id,
      profileForm.user_id,
      profileForm.full_name,
      profileForm.phone_number,
      sqlBirthDate,
      profileForm.address,
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
