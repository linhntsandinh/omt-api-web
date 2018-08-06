
package services

import javax.inject.Inject
import models._
import play.api.mvc.Result

import scala.concurrent.Future

class DepartmentService @Inject()(department: Department){
  def deleteByRoleId(id: Int)= department.delete(id)
  def insert(departmentData: DepartmentData)= {
    department.insert(departmentData)
  }
  def update(departmentData: DepartmentData) = {
    println("test")
    department.update(departmentData)
  }
}
