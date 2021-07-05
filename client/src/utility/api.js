import auth from "./auth";

function headers() {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(auth.token && { Authorization: `Bearer ${auth.token}` }),
  };
}

export function get(url) {
  return fetch(url, {
    method: "GET",
    headers: headers(),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => {
      console.log("error", error);
    });
}

export function post(url, payload) {
  fetch(url, {
    method: "POST",
    headers: headers(),
    body: payload,
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => {
      console.log("error", error);
    });
}

// import JWT from '@utility/jwt';
// import lang from '@utility/lang';
// import query from '@utility/query';
// import localStorage from '@utility/localStorage';
// const defaultOptional = {
//   cache: 'no-cache'
// };

// export default function get(ApiURL, optional) {
//   let customOptional;
//   const optionalHeaders = optional && optional.headers;
//   const headers = {
//     ...optionalHeaders,
//     Authorization: `Bearer ${JWT.token}`,
//     DeviceType: 'Web'
//   };

//   const settingUrl = apiConfig.setting.replace(/\/api\/.*/i, '');
//   const launchUrl = apiConfig.launch.replace(/\/api\/.*/i, '');
//   // by pass setting Api
//   if (ApiURL.indexOf(settingUrl) == -1 && ApiURL.indexOf(launchUrl) == -1) {
//     defaultOptional.credentials = 'include';
//   } else {
//     delete defaultOptional['credentials'];
//   }

//   customOptional = {
//     ...defaultOptional,
//     headers
//   };
//   if (optional) {
//     customOptional = {
//       ...customOptional,
//       ...optional,
//       headers
//     };
//   }
//   return fetch(ApiURL, customOptional)
//     .then(response => {
//       if (response) {
//         if (response.ok) {
//           const token = response.headers.get('Authorization');
//           const ServerCode = response.headers.get('Server');
//           if (ServerCode) localStorage.ServerCode = ServerCode;
//           if (token) {
//             JWT.token = token;
//           }
//           return response;
//         } else {
//           switch (response.status) {
//             case 401:
//               if (!window.apiConfig.isWlb) {
//                 query.q = '';
//                 location.href = `/${lang}/sports${query}`;
//               } else {
//                 if (JWT?.context?.op) {
//                   query.sni = '';
//                   // anonymous for wlb
//                   location.href = `/${lang}/sports${query}`;
//                 } else {
//                   location.href = `/error/401?t=${query.sni}`;
//                 }
//               }
//               break;
//             case 406:
//               location.href = `/error/401?t=${apiConfig.ref}`;
//               break;
//             case 403:
//               const ServerCode = response.headers.get('Server');
//               document.location.href = `/error/forbidden?s=${ServerCode}`;
//               break;
//             case 503:
//               document.location.href = '/error/503';
//               break;
//             default:
//               return response;
//               break;
//           }
//         }
//       }
//     })
//     .catch(e => console.error(`${e} url=>${ApiURL}`));
// }
