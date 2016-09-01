# vForm
����һ������֤��js�࣬�򻯱���֤�Ĳ�������һ�������ı���֤�ࣻ<br>
�ڱ��ؼ���֧���¼���<br>
֧��ָ�����֤��<br>
֧�ֱ������л���<br>
��ȡ����ȫ�����ݣ�<br>
ʹ��ajax��Ҫ����jquery,֧��get������post���������з�ֹ�ظ��ύ���ܡ�<br>

## ����
    //ʵ����vForm;������֤���򡢶�����ʾ�ķ���
    var userForm = new vForm({
        'name':'userForm',
        'validate':[
            ['username','notEmpty','����Ϊ�գ�','keyup'],
            ['username','username','�û�����ʽ����ȷ��','keyup'],
            ['password','notEmpty','���벻��Ϊ�գ�','keyup'],
            ['password',/\w+{6,16}/,'�����ʽ����ȷ��','keyup']
        ],
        'showTip':function(res,elem,msg){
            if( res ){
                //��ʾ��ʾ��Ϣ
            }else{
                //�����ʾ��Ϣ����ʾһ����ȷ��Сͼ��
            }
        }
    });
    //��������֤
    if( !userForm.validate(0) ){
        return false;
    }
    //�����л�
    var pData = userForm.serialize();
    //ajax�ύ��
    userForm.post('/test',pData,function(data){
        
    });
    
## ����

  ������һ��object,��name��validate��showTip��<br>
  {
    'name':'userForm',//
    'validate':[ //
        ['username','notEmpty','����Ϊ�գ�','keyup'],
        ['username','username','�û�����ʽ����ȷ��','keyup'],
        ['password','notEmpty','���벻��Ϊ�գ�','keyup'],
        ['password',/\w+{6,16}/,'�����ʽ����ȷ��','keyup']
    ]
  }
  
  ### name 
  
    �����ƣ������У�����ᱨһ������<br>
    
  ### validate 
  
    ��֤�����ж������ÿһ��������['�ؼ�����'��'ָ��|����|����ֵ'��'��Ϣ|�Զ�����ʾ��Ϣ�ķ���'��'�¼�']<br>
    
    �ؼ�����ָ����input,select�ȱ��ؼ�����name��ֵ��<br>
    
    �жϿ�����ָ����notEmpty,equal:yourvalue,������Զ���ָ����뵽directives�������档<br>
    �жϿ�����������ʽ��<br>
    �жϿ����ǵ���һ���ⲿ�ķ��������صĲ���ֵ��<br>
    
    ��Ϣһ��������ַ�����<br>
    ��ϢҲ������һ���Զ�����ʾ��Ϣ�ķ�������ִ�е�ǰ����֤����ʱ��Ч��<br>
    
    �¼���focus��blur��click��������ǰ���on��<br>
    
  ### showTip
  
     ��ʾ��ʾ��Ϣ������֤��Ļص�����;<br>
     �ò�������û�У������Ĭ����ʾ��Ϣ�ķ�����ʹ����alert("��Ϣ")��<br>
     
     @param boolean res ִ����֤���صĽ��<br>
     @param object elem ��ǰ�ؼ�����<br>
     @param string msg ��Ϣ����<br>
     function(res,elem,msg){
        if( res ){
            //��ʾ��ʾ��Ϣ
        }else{
            //�����ʾ��Ϣ����ʾһ����ȷ��Сͼ��
        }
     }
     
## ����
  
  �����ĵ��ã���Ҫ��ʵ����vForm�����ܵ��á�<br>
 
  ### self.validate ��֤options.validate�������ж���<br>
        @param int type  0|1|2<br>
        0��ֻ��ʾһ����ʾ��Ϣ<br>
        1����ʾȫ����ʾ��Ϣ<br>
        2������ʾ��ʾ��Ϣ<br>
    
  ### self.check �ж�,���Ը������򡢷�����ָ������ж�<br>
        @param string name  �ؼ�����<br>
        @param string|function|regular|boolean reg �жϹ���<br>
        @param msg|function msg ��ʾ��Ϣ����������ʾ��ʾ��Ϣ�ķ���<br>
        @return boolean true|false<br>
  
  ### self.showTip ��ʾ�����ǿ��Ը����Լ�����Ҫ��д<br>
        @param boolean res ��֤��Ľ��<br>
        @param string name �ؼ�����<br>
        @param string|function msg ��ʾ��Ϣ����������ʾ��ʾ��Ϣ�ķ���<br>
     
  ### self.getVal ��ȡĳһ�����ؼ���ֵ<br>
        @param string name
        
  ### self.getData ��ȡ������<br>
        @return json object<br>
        eg:<br>
        {
            "username":"123",
            "password":"123"
        }
        
  ### self.serialize �����л�<br>
        @return string
        eg:
        username=123&password=123
        
  ### self.post ����jQuery��post����,��ֹ�ظ��ύ<br>
        @param string url url��ַ<br>
        @param object params ����<br>
        @param function fun ִ�гɹ��Ժ�Ļص�����<br>
       
     
     