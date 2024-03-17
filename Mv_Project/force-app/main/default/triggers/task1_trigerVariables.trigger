trigger task1_trigerVariables on Account (before insert,after insert,before update,after update,before delete,after delete,after undelete) {
  
  for(Account acc:Trigger.new){
      if(Trigger.isBefore){
          System.debug('Before new');
          if(Trigger.isInsert){
              System.debug('Trigger is before insert');
          }if(Trigger.isUpdate){
              System.debug('Trigger is before update');
          }if(Trigger.isDelete){
              System.debug('Trigger is before delete');
          }
      }
      if(Trigger.isAfter){
        System.debug('After new');
          if(Trigger.isInsert){
              System.debug('Trigger is After insert');
          }if(Trigger.isUpdate){
              System.debug('Trigger is After update');
          }if(Trigger.isDelete){
              System.debug('Trigger is After delete');
          }
          if(Trigger.isUndelete){
              System.debug('Trigger is After Undelete');
          }
      }
  }
//   for(Account acc: Trigger.old){
//     if(Trigger.isBefore){
//         System.debug('Before old');
//         if(Trigger.isInsert){
//             System.debug('Trigger is before insert');
//         }if(Trigger.isUpdate){
//             System.debug('Trigger is before update');
//         }if(Trigger.isDelete){
//             System.debug('Trigger is before delete');
//         }
//     }
//     if(Trigger.isAfter){
//       System.debug('After old');
//         if(Trigger.isInsert){
//             System.debug('Trigger is After insert');
//         }if(Trigger.isUpdate){
//             System.debug('Trigger is After update');
//         }if(Trigger.isDelete){
//             System.debug('Trigger is After delete');
//         }
//         if(Trigger.isUndelete){
//             System.debug('Trigger is After Undelete');
//         }
//     }
//   }
}