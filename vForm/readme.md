# vForm
����һ������֤��js�࣬�򻯱���֤�Ĳ�������һ�������ı���֤�ࣻ
�ڱ��ؼ���֧���¼���
֧��ָ�����֤��
֧�ֱ������л���
��ȡ����ȫ�����ݣ�
ʹ��ajax��Ҫ����jquery,֧��get������post���������з�ֹ�ظ��ύ���ܡ�

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

  ������һ��object,��name��validate��showTip��
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
  
    �����ƣ������У�����ᱨһ������
    
  ### validate 
  
    ��֤�����ж������ÿһ��������['�ؼ�����'��'ָ��|����|����ֵ'��'��Ϣ|�Զ�����ʾ��Ϣ�ķ���'��'�¼�']
    
    �ؼ�����ָ����input,select�ȱ��ؼ�����name��ֵ��
    
    �жϿ�����ָ����notEmpty,equal:yourvalue,������Զ���ָ����뵽directives�������档
    �жϿ�����������ʽ��
    �жϿ����ǵ���һ���ⲿ�ķ��������صĲ���ֵ��
    
    ��Ϣһ��������ַ�����
    ��ϢҲ������һ���Զ�����ʾ��Ϣ�ķ�������ִ�е�ǰ����֤����ʱ��Ч��
    
    �¼���focus��blur��click��������ǰ���on��
    
  ### showTip
  
     ��ʾ��ʾ��Ϣ������֤��Ļص�����;
     �ò�������û�У������Ĭ����ʾ��Ϣ�ķ�����ʹ����alert("��Ϣ")��
     
     @param boolean res ִ����֤���صĽ��
     @param object elem ��ǰ�ؼ�����
     @param string msg ��Ϣ����
     function(res,elem,msg){
        if( res ){
            //��ʾ��ʾ��Ϣ
        }else{
            //�����ʾ��Ϣ����ʾһ����ȷ��Сͼ��
        }
     }
     
## ����
  
  �����ĵ��ã���Ҫ��ʵ����vForm�����ܵ��á�
 
  ### self.validate ��֤options.validate�������ж���
        @param int type  0|1|2
        0��ֻ��ʾһ����ʾ��Ϣ
        1����ʾȫ����ʾ��Ϣ
        2������ʾ��ʾ��Ϣ
    
  ### self.check �ж�,���Ը������򡢷�����ָ������ж�
        @param string name  �ؼ�����
        @param string|function|regular|boolean reg �жϹ���
        @param msg|function msg ��ʾ��Ϣ����������ʾ��ʾ��Ϣ�ķ���
        @return boolean true|false
  
  ### self.showTip ��ʾ�����ǿ��Ը����Լ�����Ҫ��д
        @param boolean res ��֤��Ľ��
        @param string name �ؼ�����
        @param string|function msg ��ʾ��Ϣ����������ʾ��ʾ��Ϣ�ķ���
     
  ### self.getVal ��ȡĳһ�����ؼ���ֵ
        @param string name
        
  ### self.getData ��ȡ������
        @return json object
        eg:
        {
            "username":"123",
            "password":"123"
        }
        
  ### self.serialize �����л�
        @return string
        eg:
        username=123&password=123
        
  ### self.post ����jQuery��post����,��ֹ�ظ��ύ
        @param string url url��ַ
        @param object params ����
        @param function fun ִ�гɹ��Ժ�Ļص�����
       
     
     