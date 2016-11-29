/**
 * PasswordTree (internal are categories, leaf are password_payload)
 */
export const reducer = (state, action) => {
   switch (action.type) {
   case '@@INIT':
   case '@@redux/INIT': return ({
      selectedPath: [], //the selected path

      type: 'root',
      children: [{
         data: {
            icon: 'globe',
            name: 'SSH keys'
         },

         type: 'category',
         children: [{
            data: {
               name: 'Gladio login',
               username: 'bob',
               password: [{
                  name: 'private',
                  value: 'private_key'
               }, {
                  name: 'public',
                  value: 'public_key'
               }],
               link: 'gladio.servers.my',
               securityQuestion: 'What\'s your style?',
               securityAnswers: 'casual'
            },

            type: 'entry'
         }, {
            data: {
               name: 'Ferrata login',
               username: 'bob',
               password: [{
                  name: 'private',
                  value: 'private_key'
               }, {
                  name: 'public',
                  value: 'public_key'
               }],
               link: 'ferrata.servers.my',
               securityQuestion: 'What\'s your condition?',
               securityAnswers: 'angry'
            },

            type: 'entry'
         }]
      }, {
         data: {
            icon: 'envelope',
            name: 'E-mail',
         },


         type: 'category',
         children: [{
            data: {
               name: 'BestMail',
               username: 'vercingetorige',
               password: 'h3!l0_P4s5',
               link: 'best.mail.my',
               securityQuestion: 'What\'s your passion?',
               securityAnswers: 'fruit'
            },

            type: 'entry'
         }]
      }]
   })
   case '/tree/SELECT': return ({
      ...state, selectedPath: action.data.selectedPath
   })
   default: return ({
      ...state,
      ...action.type.split('/')[1] === 'tree' && action.data || {}
   })
   }
}
