package services

import javax.inject.Inject
import models.{Profile, ProfileData, ProfileForm}

import scala.concurrent.Future

class ProfileService @Inject()(profile: Profile) {
  def delete(id: Int): Future[Int] = profile.delete(id)

  def insert(profileForm: ProfileForm): Future[Int] = {
    val profileData = new ProfileData(null,
      profileForm.user_id,
      profileForm.full_name,
      profileForm.phone_number,
      profileForm.birth_date,
      profileForm.address,
      profileForm.job_title_id,
      profileForm.job_position_id,
      profileForm.status,
      profileForm.join_date,
      profileForm.gender,
      Some(System.currentTimeMillis() / 1000),
      null,
      null,
      null
    )
    profile.insert(profileData)
  }

  def update(profileData: ProfileForm): Future[Int] = profile.update(profileData)
}
