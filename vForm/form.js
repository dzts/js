/*vForm 表单验证
     
    eg:
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
    
*/
function vForm(options){
    
     var self = this;
     
     /*formName 表单名称*/
     var formName = options.name;
     /*editForm 表单element*/
     var editForm = document[formName];
     /*指令*/
     var directives = {
        'username':/^\w{6,12}$/,
        'tel':/^1[\d]{10}$/,
        'email':/^\w+@\w+\.\w+$/
     };
     
     /*form表单不存在*/
     if( editForm == undefined ){
        throw ('vForm error:' + formName + ' form name is not exist!');
     }
     
     /*validateOptions 
        eg:
        {
            'username':[
                ['controlName','reg','tip','event'],
                ['controlName','reg','tip','event']
            ],
            'password':[
                ['controlName','reg','tip','event'],
                ['controlName','reg','tip','event']
            ]
        }
     */
     var validateOptions = {};
     
     for( var i=0;i<options.validate.length;i++ ){
         if( options.validate[i].length <= 2 ){
             throw('vForm error: options.validate error;please get options.validate = [ ["controlName","reg","tip","event"] ]');
         }
         var controlName = options.validate[i][0];
         if( typeof options.validate[i][3] != "undefined" ){
            if( typeof validateOptions[controlName] == "undefined" ){
                validateOptions[controlName] = [];
            }
            validateOptions[controlName].push(options.validate[i]);
         }
     }
     
     /*self.bindValidateEvents 给表单控件绑定事件*/
     self.bindValidateEvents = function(){
        for( controlName in validateOptions ){
            self.bindControlEvents(validateOptions[controlName]);
        }
     }
     
     /*self.bindControlEvents*/
     self.bindControlEvents = function(validateOption){
        var eventNames = [];
        for( var i=0;i<validateOption.length;i++ ){
            if( typeof validateOption[i][3] != "undefined" ){
                var eventName = validateOption[i][3];
                var isBind = 0;
                for( var j=0;j<eventNames.length;j++ ){
                    if( eventName == eventNames[i] ){
                        isBind = 1;
                    }
                }
                if( isBind == 0 ){
                    var elem = editForm[controlName];
                    if( elem.addEventListener ){
                        elem.addEventListener(eventName,function(event){
                            self.eventCallback(this,event);
                        });
                    }else if( elem.attachEvent ){
                        elem.attachEvent('on'+eventName,function(event){
                            self.eventCallback(elem,event);
                        });
                    }
                }else{
                    eventNames.push(eventName);
                }
            }
        }
     }
     
     /*self.eventCallback*/
     self.eventCallback = function(elm,event){
        var controlName = elm.name;
        var eventName = event.type;
        var validateOption = validateOptions[controlName];
        for( var i=0;i<validateOption.length;i++ ){
            if( typeof validateOption[i][3] != "undefined" && validateOption[i][3] == eventName ){
                var reg = validateOption[i][1];
                var msg = validateOption[i][2];
                var res = self.check(controlName,reg,msg);
                self.showTip(res,controlName,msg);
                if ( !res ){
                    return false;
                }
            }
        }
        return true;
     }
     
     self.bindValidateEvents();
     
     /*self.validate 验证options.validate里面所有对象
        @param int type  0|1|2
        0：只显示一条提示信息
        1：显示全部提示信息
        2：不显示提示信息
     */
     self.validate = function( type ){
        
        var result = true;
        
        for( var i=0;i<options.validate.length;i++ ){
            var name = options.validate[i][0];
            var reg = options.validate[i][1];
            var msg = options.validate[i][2];
            var res = self.check(name,reg,msg);
            if (type != 2 ){
                self.showTip(res,name,msg);
            }
            if( !res ){
                result = false;
                if( type == 0 ){
                    return false;
                }
            }
            
        }
        
        return result;
        
     }
     
     /*self.check 判断,可以根据正则、方法、指令等来判断
        @param string name  控件名称
        @param string|function|regular|boolean reg 判断规则
        @param msg|function msg 提示信息，或者是显示提示信息的方法
        @return boolean true|false
     */
     self.check = function(name,reg,msg){
        
        /*form 表单控件不存在*/
        if( typeof editForm[name] != "object" ){
            throw ('vForm error:' + name + ' of form control is not exist!' );
        }
        
        /*调用了外部的方法返回的boolean*/
        if( typeof reg == 'boolean' ){
            if( reg ){
                return true;
            }else{
                return false;
            }
        /*根据正则来判断*/
        }else if(typeof reg.test == "function"){
            if( reg.test( editForm[name].value) ){
                return true;
            }else{
                return false;
            }
        /*指令 equal isEmpty*/
        }else if(typeof reg == "string" ){
            
            /*指令 equal:\w+ 相等*/
            if(/^equal:$/.test(reg)){
                var directive = reg.split(':');
                if( editForm[name].value == directive[1] ){
                    return true;
                }else{
                    return false;
                }
            /*指令 notEmpty*/
            }else if( reg=="notEmpty" ){
                if( editForm[name].value.replace(/^\s+$/g,'') == "" ){
                    return false;
                }else{
                    return true;
                }
            /*其他指令*/
            }else{
                 if( typeof directives[reg] != "undefined" ){
                    if( directives[reg].test( editForm[name].value) ){
                        return true;
                    }else{
                        return false;
                    }
                 }else{
                    throw('vForm check error: directive ' + reg + ' is not exsit;');
                 }
            }
            
        }
        
     }
     
     /*self.showTip 显示错误，是可以根据自己的需要重写
        @param boolean res 验证后的结果
        @param string name 控件名称
        @param string|function msg 提示信息，或者是显示提示信息的方法
     */
     if( typeof options.showTip == "function" ){   
         self.showTip = function(res,name,msg){
            if( typeof msg == "function" ){
                msg(res,editForm[name]);
            }else{
                options.showTip(res,editForm[name],msg);
            }
         }
     }else{
        self.showTip = function(res,name,msg){
            if( typeof msg == "function" ){
                msg(res,editForm[name]);
            }else{
                editForm[name].focus();
                alert(msg);
            }
         }
     }
     
     /*self.getVal 获取某一个表单控件的值
        @param string name
     */
     self.getVal = function(name){
        if( typeof editForm[name] != undefined ){
            return editForm[name].value;
        }else{
            throw('vForm getVal error:control ' + name + ' is not exsit!');
        }
     }
     
     /*self.getData 获取表单数据
        @return json object
        eg:
        {
            "username":"123",
            "password":"123"
        }
     */
     self.getData = function(){
        var formData = {};
        for( var i=0;i<editForm.length;i++ ){
            if( editForm[i].type != "button" || editForm[i].type != "submit" ){
                if( editForm[i].name != "" ){
                    if( editForm[i].name.match(/\[\]$/) && editForm[i].name.length >2 ){
                        var namekey = editForm[i].name.substr( 0, editForm[i].name.length-2 )
                        if( typeof formData[namekey] == "undefined" ){
                            formData[namekey] = [];
                        }
                        formData[ namekey ].push( editForm[i].value );
                    }else{
                        var res = editForm[i].name.match(/(\[\w+\])/g);
                        if( res instanceof Array ){
                            var cname = editForm[i].name.split("[")[0];
                            var data = {};
                            var len = res.length;
                            for( var k=len-1;k>=0;k-- ){
                                res[k] = res[k].replace("[","");
                                res[k] = res[k].replace("]","");
                            }
                            if( typeof formData[cname] == "undefined" ){
                                formData[cname] = {};
                            } 
                            if( res.length == 1 ){
                                formData[cname][res[0]] = editForm[i].value;
                            }else if(res.length == 2 ){
                                if( typeof formData[cname][res[0]] == "undefined" ){
                                    formData[cname][res[0]] = {};
                                }
                                formData[cname][res[0]][res[1]] = editForm[i].value;
                            }else if( res.length == 3 ){
                                if( typeof formData[cname][res[0]] == "undefined" ){
                                    formData[cname][res[0]] = {};
                                }
                                if( typeof formData[cname][res[0]][res[1]] == "undefined" ){
                                    formData[cname][res[0]][res[1]] = {};
                                }
                                formData[cname][res[0]][res[1]][res[2]] = editForm[i].value;
                            }else{
                                throw('vForm getData error:The array has a maximum of 3 layers');
                            }
                        }else{
                            formData[editForm[i].name] = editForm[i].value;
                        }
                    }
                    
                }
            }
        }
        return formData;
     }
     
     /*self.serialize 表单序列化
        @return string
        eg:
        username=123&password=123
     */
     self.serialize = function(){
        var formData = [];
        for( var i=0;i<editForm.length;i++ ){
            if( editForm[i].type != "button" || editForm[i].type != "submit" ){
                if( editForm[i].name != "" ){
                    formData.push( editForm[i].name + '=' + editForm[i].value );
                }
            }
        }
        return formData.join('&');
     }
     
     /*submitTime 为了防止重复提交*/
     var submitTime = 0;
     
     /*self.get 调用jQuery的get请求，防止重复提交
        @param string url url地址
        @param function fun 执行成功以后的回调方法
     */
     self.get = function(url,fun){
        if( typeof jQuery == "undefined" ){
            throw('vForm error: please load jquery!');
        }
        var nowTime = new Date().getTime();
        if( nowTime - submitTime > 3000 ){
            submitTime = nowTime;
            jQuery.get(url,function(data){
                submitTime = 0;
                fun(data);
            });
        }else{
            return false;
        }
     }
     
     /*self.post 调用jQuery的post请求,防止重复提交
        @param string url url地址
        @param object params 参数
        @param function fun 执行成功以后的回调方法
     */
     self.post = function(url,params,fun){
        if( typeof jQuery == "undefined" ){
            throw('vForm error: please load jquery!');
        }
        var nowTime = new Date().getTime();
        if( nowTime - submitTime > 3000 ){
            submitTime = nowTime;
            jQuery.post(url,params,function(data){
                submitTime = 0;
                fun(data);
            });
        }else{
            return false;
        }
     }
     
}