export const reducer = (state, action) => {
   console.log('dispached action', action)
   switch (action.type) {
   case '@@INIT':
   case '@@redux/INIT': return ({
      username: 'bob',
      password: 'bob',
      /**
       * The Cryptographic algorithm, from
       * {@link https://www.npmjs.com/package/crypto-js}
       * @type {String}
       */
      algorithm: 'aes',
   })
   default: return ({
      ...state,
      ...action.type.split('/')[1] === 'system' && action.data || {}
   })
   }
}
