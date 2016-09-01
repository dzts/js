# vForm
这是一个表单验证的js类，简化表单验证的操作，是一个很灵活的表单验证类；<br>
在表单控件上支持事件；<br>
支持指令的验证；<br>
支持表单的序列化；<br>
获取表单的全部数据；<br>
使用ajax需要加载jquery,支持get方法和post方法，还有防止重复提交功能。<br>

## 例子
    //实例化vForm;定义验证规则、定义提示的方法
    var userForm = new vForm({
        'name':'userForm',
        'validate':[
            ['username','notEmpty','不能为空！','keyup'],
            ['username','username','用户名格式不正确！','keyup'],
            ['password','notEmpty','密码不能为空！','keyup'],
            ['password',/\w+{6,16}/,'密码格式不正确！','keyup']
        ],
        'showTip':function(res,elem,msg){
            if( res ){
                //显示提示信息
            }else{
                //清除提示信息，显示一个正确的小图标
            }
        }
    });
    //表单整体验证
    if( !userForm.validate(0) ){
        return false;
    }
    //表单序列化
    var pData = userForm.serialize();
    //ajax提交表单
    userForm.post('/test',pData,function(data){
        
    });
    
## 参数

  参数是一个object,有name、validate、showTip。<br>
  {
    'name':'userForm',//
    'validate':[ //
        ['username','notEmpty','不能为空！','keyup'],
        ['username','username','用户名格式不正确！','keyup'],
        ['password','notEmpty','密码不能为空！','keyup'],
        ['password',/\w+{6,16}/,'密码格式不正确！','keyup']
    ]
  }
  
  ### name 
  
    表单名称，必须有，否则会报一个错误。<br>
    
  ### validate 
  
    验证规则，有多个规则，每一个规则都有['控件名称'、'指令|正则|布尔值'、'消息|自定义显示消息的方法'、'事件']<br>
    
    控件名称指的是input,select等表单控件属性name的值。<br>
    
    判断可以是指令有notEmpty,equal:yourvalue,你可以自定义指令加入到directives数组里面。<br>
    判断可以是正则表达式。<br>
    判断可以是调用一个外部的方法，返回的布尔值。<br>
    
    消息一般情况是字符串。<br>
    消息也可以是一个自定义显示消息的方法，在执行当前的验证规则时生效。<br>
    
    事件是focus、blur、click；不能在前面加on。<br>
    
  ### showTip
  
     显示提示消息，是验证后的回调方法;<br>
     该参数可以没有，会调用默认显示消息的方法，使用是alert("消息")。<br>
     
     @param boolean res 执行验证返回的结果<br>
     @param object elem 当前控件对象<br>
     @param string msg 消息内容<br>
     function(res,elem,msg){
        if( res ){
            //显示提示信息
        }else{
            //清除提示信息，显示一个正确的小图标
        }
     }
     
## 方法
  
  方法的调用，需要先实例化vForm，才能调用。<br>
 
  ### self.validate 验证options.validate里面所有对象<br>
        @param int type  0|1|2<br>
        0：只显示一条提示信息<br>
        1：显示全部提示信息<br>
        2：不显示提示信息<br>
    
  ### self.check 判断,可以根据正则、方法、指令等来判断<br>
        @param string name  控件名称<br>
        @param string|function|regular|boolean reg 判断规则<br>
        @param msg|function msg 提示信息，或者是显示提示信息的方法<br>
        @return boolean true|false<br>
  
  ### self.showTip 显示错误，是可以根据自己的需要重写<br>
        @param boolean res 验证后的结果<br>
        @param string name 控件名称<br>
        @param string|function msg 提示信息，或者是显示提示信息的方法<br>
     
  ### self.getVal 获取某一个表单控件的值<br>
        @param string name
        
  ### self.getData 获取表单数据<br>
        @return json object<br>
        eg:<br>
        {
            "username":"123",
            "password":"123"
        }
        
  ### self.serialize 表单序列化<br>
        @return string
        eg:
        username=123&password=123
        
  ### self.post 调用jQuery的post请求,防止重复提交<br>
        @param string url url地址<br>
        @param object params 参数<br>
        @param function fun 执行成功以后的回调方法<br>
       
     
     