 <div class="col-md-12">
                           <div class="row" >
                             <div class="col-md-3" style=" background-color:#fff; padding:3px;height:95px;">
							  
							 <img style="float:left;" src="{{profile.logo}}" width="100px"/>
           
                             </div>
							    
                             <div class="col-md-9" style=" background-color:#fff;height:95px;">
							 


					<center><span style="font-weight:600; font-size:20px;color:#033B59; text-decoration:none; font-family:Arial,Verdana,Helvitica,sans-serif ">
					{{profile.name}}</span> 
					<br/>
<span class="headnewsname" style="color:#808080;">
{{profile.location}}, {{}}
P.O.Box:{{profile.pobox}} ,
Tel:{{profile.tel}}<br/>
Email: {{profile.email}}
 , Website: {{profile.website}}
<br/>
Motto: {{profile.motto}}</span>  
</center>  
</div>
</div>

</div>
   
   <ul class="pagination pagination-sm" style="border-bottom:thin solid #ccc; width:100%;padding-top:0;">
  

  <li  ng-class="{'active':'student-regform'==activepagemenu}"><a href="#" ng-click="pagesmenu('student-regform');">Student Registration Form <span class="sr-only"></span></a></li>
   <li    ng-class="{'active':'data-migration'==activepagemenu}"><a href="#" ng-click="pagesmenu('data-migration');">Data Migration<span class="sr-only"></span></a></li>
   <!--li    ng-class="{'active':'school-services'==activepagemenu}"><a href="#" ng-click="pagesmenu('school-services');">subjects<span class="sr-only"></span></a></li>
  <li    ng-class="{'active':'school-notice'==activepagemenu}"><a href="#" ng-click="pagesmenu('school-notice');">Timetable<span class="sr-only"></span></a></li>
  <li    ng-class="{'active':'school-academic'==activepagemenu}"  ><a href="#" ng-click="pagesmenu('school-academic');">Exam <span class="sr-only"></span></a></li> 
  <li    ng-class="{'active':'school-achievement'==activepagemenu}"><a href="#" ng-click="pagesmenu('school-achievement');">Fees & Payments<span class="sr-only"></span></a></li> 
  <li    ng-class="{'active':'school-event'==activepagemenu}"><a href="#" ng-click="pagesmenu('school-event');">Attendance <span class="sr-only"></span></a></li-->  
</ul>  

	<!-- Basic Setup -->

<!-- Removing search and results count filter -->




	
  
  
  
  <!--  NEW FORM class="" --->
  

<div  style="margin:2px; background-color:#fff;" id="student-regform">
	<div class="col-sm-12">
        <div class="panel">
			<div class="panel-heading" style="background-color:#8CB2F3;color:#fff; text-align:center; padding:10px;">
			<strong>STUDENT REGISTRATION FORM</strong>
			</div>
				<div class="panel-body"style="border:#ccc 2px solid;">
			
			<div class="panel-body">
			
			<div class="row">
			<div class="col-lg-12">
				<div class="col-md-3">
					<div class="form-group">
					<center>
					<a href="" class="user-img">
					<img id="studentimage" src="assets/images/user-4.png" alt="user-img" class="img-cirlce img-responsive img-thumbnail" />
				</a></br>
				</center>
				
					
				<input id="studentfile" style="display:none;" type="file" file-model="image"
		        class="studentfile" name="avatar" onchange="readURLs(this,'studentimage');"/>	
				<button ng-click="openimage('studentfile')" type="button" style="color:#fff; margin-left:15px;" class="btn btn-success" onclick="javascript: $('#formuploadfile').toggle();">
										<i class="el-attach"></i> Upload Image								
										</button>
				</div>
				</div><br/><br/>
				<div class="col-md-3">
					<div class="form-group">
					<br/><br/>
				
					
						<label class="control-label" for="first_name">First Name </label>
						<input class="form-control" style="border:#1d681d solid thin;" ng-model="x.first_name" name="first_name" id="first_name"   />
					</div>
				</div>
				
				<div class="col-md-3">
				<br/><br/>
					<div class="form-group">
						<label class="control-label" for="middle_name">Middle Name</label>
						<input class="form-control" style="border:#1d681d solid thin;" ng-model="x.middle_name" name="middle_name" id="middle_name" data-validate="Optional"  />
					</div>
				</div>
				
				<div class="col-md-3">
				<br/><br/>
					<div class="form-group">
						<label class="control-label" for="last_name">Last Name</label>
						<input class="form-control" style="border:#1d681d solid thin;" ng-model="x.last_name" name="last_name" id="last_name"   />
					</div>
				</div>
				
				</div>
				</div>
				<div class="row">
				<div class="col-lg-12">
				<div class="col-md-4">
					<div class="form-group">
						<label class="control-label" for="registration">Registration No.</label>
						<input class="form-control" style="border:#1d681d solid thin;" ng-model="x.registration_id" name="registration" id="registration"   />
					</div>
				</div>
				<div class="col-md-4">
					<div class="form-group">
						<label class="control-label" for="birthdate">Birthdate</label>
						<input class="form-control" style="border:#1d681d solid thin;" name="birthdate" ng-model="x.birth_date" id="birthdate"   />
					</div>
				</div>
				
				<div class="col-md-4">
					<div class="form-group">
						<label class="control-label" for="country">Nationality</label>
						<input class="form-control" style="border:#1d681d solid thin;" ng-model="x.nationality" id="s2example-1"   />
							    	</div>
				</div>
				
				
				</div>
				</div>
				
				
				
				
				
				
				
				
				<div class="row">
				<div class="col-lg-12">
				
				
				
				
				<div class="col-md-4">
					<div class="form-group">
						<label class="control-label">Year</label>					
						
						
						<select class="form-control" style="border:#1d681d solid thin;" ng-model="x.year" ng-init="x.year='<?php echo date("Y");?>'" id="s2example-1">
							<option value='' >--Select Year--</option>
								<?php for($e=date("Y");$e>2013; $e--){
					
					echo '<option  value="'.$e.'">'.$e.'</option>';
				} ?>
				
				       </select>	
					</div>
				</div> 
				<div class="col-md-4">
				<div class="form-group">
						<label class="control-label">Class </label>					
						
						
						<select class="form-control" style="border:#1d681d solid thin;" ng-model="x.classid" ng-int="x.classid=getClassesStreams[0].id" id="s2example-1">
							<option value="">--Select Class--</option>
								<option ng-repeat="x in getClassesStreams" value="{{x.id}}">{{x.name}}</option>
				
				</select>
				
			      </div>	
			   </div>	

				<div class="col-md-4">			   
				<div class="form-group">
						<label class="control-label">Stream </label>
					<select name="" style="border:#1d681d solid thin;" ng-model="x.stream" ng-init="x.stream=getclassstream[0].id" class="form-control">
				<option  value="">--Select Stream--</option>
				<option ng-repeat="x in getclassstream" value="{{x.id}}">{{x.name}}</option>
				</select>

							
			     	
				   </div>
				  
			   </div>  
			</div>
			</div>
			
			
			<div class="row">
				<div class="col-md-12">
				<div class="col-md-4">
					<div class="form-group">
						<label class="control-label" for="Physical Address">Admission Date
						</label>
						<input style="border:#1d681d solid thin;" type="date" class="form-control" ng-model="x.admission_date" name="physical_address"  
						 />
					</div>
				</div>
				<div class="col-md-4">
					<div class="form-group">
						<label class="control-label" for="country">Boarding/Day</label>
						<select style="border:#1d681d solid thin;" class="form-control" ng-model="x.boarding_day" ng-init="x.boarding_day=''" id="s2example-1"   >
						<option value="">--Select --</option>
						<option value="boarding">Boarding </option>
						<option value="day">Day </option>
						</select>
							    	</div>
				</div>
				
				<div class="col-md-4">
					<div class="form-group">
						<label class="control-label" for="tel">Former School</label>
						<input class="form-control" style="border:#1d681d solid thin;" ng-model="x.former_school" name="tel" id="tel"   />
					</div>
				</div>
				
				
				
				
				</div>
				</div>
			
			<div class="row">
				<div class="col-md-12">
				<div class="col-md-3">
					<div class="form-group">
						<label class="control-label" for="Physical Address">Physical Address
						</label>
						<input class="form-control" style="border:#1d681d solid thin;" ng-model="x.physical_address" name="physical_address"  
						 />
					</div>
				</div>
				<div class="col-md-3">
					<div class="form-group">
						<label class="control-label" for="country">Postal Address</label>
						<input class="form-control" style="border:#1d681d solid thin;" ng-model="x.pobox" id="s2example-1"   />
							    	</div>
				</div>
				
				<div class="col-md-3">
					<div class="form-group">
						<label class="control-label" for="tel">Telephone</label>
						<input class="form-control" style="border:#1d681d solid thin;" ng-model="x.telephone" name="tel" id="tel"   />
					</div>
				</div>
				
				
				
				<div class="col-md-3">
					<div class="form-group">
						<label class="control-label" for="middle_name">Email</label>
						<input class="form-control"  style="border:#1d681d solid thin;" ng-model="x.email" name="email" id="email" data-validate="Optional"  />
					</div>
				</div>
				</div>
				</div>
			
			
			<div class="row">
			<div class="col-lg-12">		   
				<div class="form-group">
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<label class="cbr-inline">Select Gender</br></br>
				<input  ng-model="x.gender" ng-init="x.gender='Male'" style="border:#1d681d solid thin;" type="radio" name="radio-2" value="M" class="cbr cbr-blue" checked />
				Male
				</label>
				<label class="cbr-inline">
				<input type="radio" ng-model="x.gender" style="border:#1d681d solid thin;" value="F" name="radio-2"  class="cbr cbr-blue">
				Female
				</label>				 
			</div>
			</div>
			</div>
			</div>
			</div>	
			
			<div class="panel-heading" style="background-color:#8CB2F3; padding:10px; text-align:center;color:#fff;">
			<strong>HEALTH INFO</strong>
			</div>
			
			
			<div class="panel-body" style="border:#ccc 2px solid;">
			
			<div class="panel-body">
				<div class="col-md-4">
					<div class="form-group">
						<label class="control-label" for="sir_name">Health & Alegic</label>
						<input class="form-control" style="border:#1d681d solid thin;" ng-model="x.remark" name="sir_name" id="sir_name"  placeholder="Alegic" />
						
				</div>
				</div>
				
				<div class="col-md-3">
					<div class="form-group">
						<label class="control-label" for="sir_name">&nbsp;&nbsp;&nbsp;&nbsp;</label>
			<input class="form-control" style="border:#1d681d solid thin;" ng-model="privilege"  type="hidden" ng-init="privilege='12'"  name="sir_name" id="sir_name"  placeholder="Alegic" />
						
					</div>
				</div>
				
				
				<div class="col-md-3">
					
				</div>
				
			</div>
		
		
			
				</div>
			
			<div class="panel-heading" style="background-color:#8CB2F3;  text-align:center; padding:10px;color:#fff;">
			<strong>PARENT INFO</strong>
			</div>
			</br>
			
			<div class="panel-body" style="border:#ccc 2px solid; padding:10px;">
			
			<div class="panel-body">
			<div class="row">
			<div class="col-md-12">
					<div class="col-md-4">
					<div class="form-group">
						<label class="control-label" for="Parent_First">Parent Name</label>
						<input style="border:#1d681d solid thin;" class="form-control" ng-model="x.parent_name" name="" id="parent_name" data-validate="Optional"  />
					</div>
				</div>
				<div class="col-md-4">
					<div class="form-group">
						<label class="control-label" for="sir_name">Physical Address</label>
						<input style="border:#1d681d solid thin;" class="form-control" ng-model="x.parent_address" name="parent__name" id="parent_name"   />
					</div>
				</div>
				<div class="col-md-4">
					<div class="form-group">
						<label class="control-label" for="middle_name">Telephone</label>
						<input style="border:#1d681d solid thin;" class="form-control" ng-model="x.parent_phone_number" id="parent_tel" data-validate="Optional"  />
					</div>
				</div> 
				</div>
				
				
				<div class="col-md-12">
				<div class="col-md-4">
					<div class="form-group">
						<label class="control-label" for="sir_name">Parent Email</label>
						<input style="border:#1d681d solid thin;" class="form-control" ng-model="x.parent_email" name="parent_name" id="parent_name"   />
					</div>
				</div>
				<div class="form-group">
						<label class="control-label"></label>					
						
						
						
						<div class="col-md-4"> 
						<label class="control-label" for="sir_name">Parent Relation</label>
						<input style="border:#1d681d solid thin;" class="form-control" ng-model="x.relation" name="parent_name" id="parent_name"   />
					
											
			      </div>	
			   </div>	
			</div>
			</div>
			</div>
			</div>
		
				



<!-- parent 2 -->				
				
				
				<div class="panel-body" style="border:#ccc 2px solid;">
			
			<div class="panel-body">
			<div class="row">
			<div class="col-md-12">
					<div class="col-md-4">
					<div class="form-group">
						<label class="control-label" for="Parent_First">Parent Name</label>
						<input style="border:#1d681d solid thin;" class="form-control" ng-model="x.parent_name2" name="" id="parent_name" data-validate="Optional"  />
					</div>
				</div>
				<div class="col-md-4">
					<div class="form-group">
						<label class="control-label" for="sir_name">Physical Address</label>
						<input  style="border:#1d681d solid thin;" class="form-control" ng-model="x.parent_address2" name="parent__name" id="parent_name"   />
					</div>
				</div>
				<div class="col-md-4">
					<div class="form-group">
						<label class="control-label" for="middle_name">Telephone</label>
						<input style="border:#1d681d solid thin;" class="form-control" ng-model="x.parent_phone_number2" id="parent_tel" data-validate="Optional"  />
					</div>
				</div> 
				</div>
				
				
				<div class="col-md-12">
				<div class="col-md-4">
					<div class="form-group">
						<label class="control-label" for="sir_name">Parent Email</label>
						<input style="border:#1d681d solid thin;" class="form-control" ng-model="x.parent_email2" name="parent_name" id="parent_name"   />
					</div>
				</div>
				<div class="form-group">
						<label class="control-label"></label>					
						
						
						
						<div class="col-md-4"> 
						<label class="control-label" for="sir_name">Parent Relation</label>
						<input style="border:#1d681d solid thin;" class="form-control" ng-model="x.relation2" name="parent_name" id="parent_name"   />
					
											
			      </div>	
			   </div>	
			</div>
			</div>
			</div>
			</div>	
				
				<div class="panel-body" style="border:#ccc 2px solid;">
			
			<div class="panel-body">
			<div class="row">
			<div class="col-md-12">
					<div class="col-md-4">
					<div class="form-group">
						<label class="control-label" for="Parent_First">Parent Name</label>
						<input style="border:#1d681d solid thin;" class="form-control" ng-model="x.parent_name3" name="" id="parent_name" data-validate="Optional"  />
					</div>
				</div>
				<div class="col-md-4">
					<div class="form-group">
						<label class="control-label" for="sir_name">Physical Address</label>
						<input style="border:#1d681d solid thin;" class="form-control" ng-model="x.parent_address3" name="parent__name" id="parent_name"   />
					</div>
				</div>
				<div class="col-md-4">
					<div class="form-group">
						<label class="control-label" for="middle_name">Telephone</label>
						<input style="border:#1d681d solid thin;" class="form-control" ng-model="x.parent_phone_number3" id="parent_tel" data-validate="Optional"  />
					</div>
				</div> 
				</div>
				
				
				<div class="col-md-12">
				<div class="col-md-4">
					<div class="form-group">
						<label class="control-label" for="sir_name">Parent Email</label>
						<input style="border:#1d681d solid thin;" class="form-control" ng-model="x.parent_email3" name="parent_name" id="parent_name"  />
					</div>
				</div>
				<div class="form-group">
						<label class="control-label"></label>					
						
						
						
						<div class="col-md-4"> 
						<label class="control-label" for="sir_name">Parent Relation</label>
						<input style="border:#1d681d solid thin;" class="form-control" ng-model="x.relation3" name="parent_name" id="parent_name"   />
					
											
			      </div>	
			   </div>	
			</div>
			</div>
			</div>
			</div>
			
			
			
			
				
				
				
				<div>
				<div class="col-md-3">
					<div class="form-group">
						<label class="control-label" for="sir_name">&nbsp;&nbsp;&nbsp;&nbsp;</label>
						<br/>
						<button ng-click="setmember(x,privilege);success-reg();" class="btn btn-success btn-single">Submit</button>
					</div>
				</div>
				<center>	
				<button style="display:none;" class="btn btn-success success-reg" ng-click="success-reg();" id="">
		<h3>Successfull Registered</h3>
		</button>
		</center>
			</div>
			
			   
		</div>
	</div>
				
		
</div>
  
  
  
  

   <div class="student-class" id="data-migration" style="display:none; font-weight:700;background-color:#fff; border:thin solid #ccc;" >
  <div class="row">
				<div class="col-lg-12" style="padding-top:50px;">
				
				
				
				
				<div class="col-md-4">
					<div class="form-group">
						<label class="control-label">Year</label>					
						
						
						<select class="form-control" style="border:#1d681d solid thin;" ng-model="x.year" ng-init="x.year='<?php echo date("Y");?>'" id="s2example-1">
							<option value='' >--Select Year--</option>
								<?php for($e=date("Y");$e>2013; $e--){
					
					echo '<option  value="'.$e.'">'.$e.'</option>';
				} ?>
				
				       </select>	
					</div>
				</div> 
				<div class="col-md-4">
				<div class="form-group">
						<label class="control-label">Class </label>					
						
						
						<select class="form-control" style="border:#1d681d solid thin;" ng-model="x.classid" ng-int="x.classid=getClassesStreams[0].id" id="s2example-1">
							<option value="">--Select Class--</option>
								<option ng-repeat="x in getClassesStreams" value="{{x.id}}">{{x.name}}</option>
				
				</select>
				
			      </div>	
			   </div>	

				<div class="col-md-4">			   
				<div class="form-group">
						<label class="control-label">Stream </label>
					<select name="" style="border:#1d681d solid thin;" ng-model="x.stream" ng-init="x.stream=getclassstream[0].id" class="form-control">
				<option  value="">--Select Stream--</option>
				<option ng-repeat="x in getclassstream" value="{{x.id}}">{{x.name}}</option>
				</select>

							
			     	
				   </div>
				  
			   </div>  
			</div>
			</div>
			
			<div class="row">
				<div class="col-lg-12">
				
				
				
				
				<div class="col-md-4">
				<input id="uploadfilexls" style="display:none;" type="file" file-model="image" accept=".xls,.xlsx" class="uploadfilexls" name="avatar" onchange="readURLs(this,'uploadfilexls');"/>
       
		<input type="submit"
style="-webkit-border-radius: 4px !important;
         -moz-border-radius: 4px !important; border-color:#eee;
              border-radius: 4px !important;
      -webkit-border-top: 4px !important;
         -moz-border-top: 4px !important;
              border-top: 4px !important;
      -webkit-border-bottom: 4px !important;
         -moz-border-bottom: 4px !important;
              border-bottom: 4px !important;"

 class="btn  btn-success" ng-click="openimage('uploadfilexls')"  name="" value="Upload Excel Sheet" />
 		<br/>	
		<img id="uploadfilexlsimage" style="display:none; width:100px; " src="images/xls.png" />
		
				</div> 
				<div class="col-md-4">
                <div class="form-group">
				<button  ng-click="datamigration(x.year,x.classid,x.stream,'uploadfile','student');" class="btn btn-success" >Submit </button>
				</div>
			    </div>	

				<div class="col-md-4">			   
				
				  
			   </div>  
			</div>
			
			
			
			</div>
			
			<br/><br/><br/>
			<center><h2>Shift Class To Next Class <hr/> </h2></center>
			<div class="row">
			    
			
				<div class="col-lg-12" style="padding-top:50px;">
				<h4> Class To Shift </h4>
				
				
				
				<div class="col-md-4">
					<div class="form-group">
						<label class="control-label">Year</label>					
						
						
						<select class="form-control" style="border:#1d681d solid thin;" ng-model="xyear" ng-init="xyear='<?php echo date("Y");?>'" id="s2example-1">
							<option value='' >--Select Year--</option>
								<?php for($e=date("Y");$e>2013; $e--){
					
					echo '<option  value="'.$e.'">'.$e.'</option>';
				} ?>
				
				       </select>	
					</div>
				</div> 
				<div class="col-md-4">
				<div class="form-group">
						<label class="control-label">Class </label>					
						
						
						<select class="form-control" style="border:#1d681d solid thin;" ng-model="xclassid" ng-int="xclassid=getClassesStreams[0].id" id="s2example-1">
							<option value="">--Select Class--</option>
								<option ng-repeat="x in getClassesStreams" value="{{x.id}}">{{x.name}}</option>
				
				</select>
				
			      </div>	
			   </div>	

				<div class="col-md-4">			   
				<div class="form-group">
						<label class="control-label">Stream </label>
					<select name="" style="border:#1d681d solid thin;" ng-model="xstream" ng-init="xstream=getclassstream[0].id" class="form-control">
				<option  value="">--Select Stream--</option>
				<option ng-repeat="x in getclassstream" value="{{x.id}}">{{x.name}}</option>
				</select>

							
			     	
				   </div>
				  
			   </div>  
			</div>
			</div>
			
			
			
			
			<div class="row">
			
			
				<div class="col-lg-12" style="padding-top:50px;">
				
			<h4>Shift Class To This Class </h4>
				
				
				
				<div class="col-md-4">
					<div class="form-group">
						<label class="control-label">Year</label>					
						
						
						<select class="form-control" style="border:#1d681d solid thin;" ng-model="yyear" ng-init="yyear='<?php echo date("Y");?>'" id="s2example-1">
							<option value='' >--Select Year--</option>
								<?php for($e=date("Y");$e>2013; $e--){
					
					echo '<option  value="'.$e.'">'.$e.'</option>';
				} ?>
				
				       </select>	
					</div>
				</div> 
				<div class="col-md-4">
				<div class="form-group">
						<label class="control-label">Class </label>					
						
						
						<select class="form-control" style="border:#1d681d solid thin;" ng-model="yclassid" ng-int="yclassid=getClassesStreams[0].id" id="s2example-1">
							<option value="">--Select Class--</option>
								<option ng-repeat="x in getClassesStreams" value="{{x.id}}">{{x.name}}</option>
				
				</select>
				
			      </div>	
			   </div>	

				<div class="col-md-4">			   
				<div class="form-group">
						<label class="control-label">Stream </label>
					<select name="" style="border:#1d681d solid thin;" ng-model="ystream" ng-init="ystream=getclassstream[0].id" class="form-control">
				<option  value="">--Select Stream--</option>
				<option ng-repeat="x in getclassstream" value="{{x.id}}">{{x.name}}</option>
				</select>

							
			     	
				   </div>
				  
			   </div>  
			</div>
			</div>
			
			<div class="row">
				<div class="col-lg-12">
				
				
				
				
				<div class="col-md-4">
			
			<button  ng-click="shiftclass()" class="btn btn-success" >Submit </button>
				
 		<br/>	
		
				</div> 
				<div class="col-md-4">
                <div class="form-group">
				</div>
			    </div>	

				<div class="col-md-4">			   
				
				  
			   </div>  
			</div>
			
			
			
			</div>
			
   </div>
   


		