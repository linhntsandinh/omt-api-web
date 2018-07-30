
package services
import javax.inject.Inject
import models._
import play.api.mvc.Result

import scala.concurrent.Future

class DepartmentService @Inject()(department: Department){
  def deleteByRoleId(id: Int): Future[Result] = department.delete(id)
  def insert(departmentData: DepartmentData): Future[Result] = {
    department.insert(departmentData)
  }
  def update(departmentData: DepartmentData): Future[Result] = {
    println("test")
    department.update(departmentData)
  }
}
