import axios from 'axios'
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import Strikethrough from 'editorjs-strikethrough'
import InlineCode from "@editorjs/inline-code";
import InlineImage from "editorjs-inline-image";
// import Carousel from '@vietlongn/editorjs-carousel';
import Alert from "editorjs-alert";
import Fontfamily from "../../components/plugins/FontFamily";
import Clipboard from "../../components/plugins/clipboard/tool";
import TextColor from "../../components/plugins/TextColor";
// import AttachesTool from "@editorjs/attaches";
import FontSizeTool from "../../components/plugins/TextSize"
import SimpleImage from "@editorjs/simple-image";
// import Personality from '@editorjs/personality'
const Carousel = window.Carousel;
async function uploadByFile(file) {
  const formData = new FormData()
  formData.append('image', file)

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const { data: url } = await axios.post('/api/upload', formData, config);

  return {
    success: 1,
    file: {
      url,
    },
  };
}

async function uploadOnlyFile(file) {
  const formData = new FormData()
  formData.append('image', file)

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const { data: url } = await axios.post('/api/fileupload', formData, config);

  return {
    success: 1,
    file: {
      url,
    },
  };
}
export const EDITOR_JS_TOOLS = {
 embed: {
    class: Embed,
    config: {
      services: {
        vimeo: {
          regex: /(?:http[s]?:\/\/)?(?:www.)?vimeo\.co(?:.+\/([^\/]\d+)(?:#t=[\d]+)?s?$)/,
          embedUrl: 'https://player.vimeo.com/video/<%= remote_id %>?title=0&byline=0',
          html: '<iframe style="width:100%;" height="320" frameborder="0"></iframe>',
          height: 320,
          width: 580,
        },
        youtube: {
          regex: /(?:https?:\/\/)?(?:www\.)?(?:(?:youtu\.be\/)|(?:youtube\.com)\/(?:v\/|u\/\w\/|embed\/|watch))(?:(?:\?v=)?([^#&?=]*))?((?:[?&]\w*=\w*)*)/,
          embedUrl: 'https://www.youtube.com/embed/<%= remote_id %>',
          html: '<iframe style="width:100%;" height="320" frameborder="0" allowfullscreen></iframe>',
          height: 320,
          width: 580,
          id: ([id, params]) => {
            if (!params && id) {
              return id;
            }
      
            const paramsMap = {
              start: 'start',
              end: 'end',
              t: 'start',
              // eslint-disable-next-line camelcase
              time_continue: 'start',
              list: 'list',
            };
      
            params = params.slice(1)
              .split('&')
              .map(param => {
                const [name, value] = param.split('=');
      
                if (!id && name === 'v') {
                  id = value;
      
                  return;
                }
      
                if (!paramsMap[name]) {
                  return;
                }
      
                return `${paramsMap[name]}=${value}`;
              })
              .filter(param => !!param);
      
            return id + '?' + params.join('&');
          },
        },
        coub: {
          regex: /https?:\/\/coub\.com\/view\/([^\/\?\&]+)/,
          embedUrl: 'https://coub.com/embed/<%= remote_id %>',
          html: '<iframe style="width:100%;" height="320" frameborder="0" allowfullscreen></iframe>',
          height: 320,
          width: 580,
        },
        vine: {
          regex: /https?:\/\/vine\.co\/v\/([^\/\?\&]+)/,
          embedUrl: 'https://vine.co/v/<%= remote_id %>/embed/simple/',
          html: '<iframe style="width:100%;" height="320" frameborder="0" allowfullscreen></iframe>',
          height: 320,
          width: 580,
        },
        imgur: {
          regex: /https?:\/\/(?:i\.)?imgur\.com.*\/([a-zA-Z0-9]+)(?:\.gifv)?/,
          embedUrl: 'http://imgur.com/<%= remote_id %>/embed',
          html: '<iframe allowfullscreen="true" scrolling="no" id="imgur-embed-iframe-pub-<%= remote_id %>" class="imgur-embed-iframe-pub" style="height: 500px; width: 100%; border: 1px solid #000"></iframe>',
          height: 500,
          width: 540,
        },
        gfycat: {
          regex: /https?:\/\/gfycat\.com(?:\/detail)?\/([a-zA-Z]+)/,
          embedUrl: 'https://gfycat.com/ifr/<%= remote_id %>',
          html: "<iframe frameborder='0' scrolling='no' style=\"width:100%;\" height='436' allowfullscreen ></iframe>",
          height: 436,
          width: 580,
        },
        'twitch-channel': {
          regex: /https?:\/\/www\.twitch\.tv\/([^\/\?\&]*)\/?$/,
          embedUrl: 'https://player.twitch.tv/?channel=<%= remote_id %>',
          html: '<iframe frameborder="0" allowfullscreen="true" scrolling="no" height="366" style="width:100%;"></iframe>',
          height: 366,
          width: 600,
        },
        'twitch-video': {
          regex: /https?:\/\/www\.twitch\.tv\/(?:[^\/\?\&]*\/v|videos)\/([0-9]*)/,
          embedUrl: 'https://player.twitch.tv/?video=v<%= remote_id %>',
          html: '<iframe frameborder="0" allowfullscreen="true" scrolling="no" height="366" style="width:100%;"></iframe>',
          height: 366,
          width: 600,
        },
        'yandex-music-album': {
          regex: /https?:\/\/music\.yandex\.ru\/album\/([0-9]*)\/?$/,
          embedUrl: 'https://music\.yandex\.ru/iframe/#album/<%= remote_id %>/',
          html: '<iframe frameborder=\"0\" style=\"border:none;width:540px;height:400px;\" style=\"width:100%;\" height=\"400\"></iframe>',
          height: 400,
          width: 540,
        },
        'yandex-music-track': {
          regex: /https?:\/\/music\.yandex\.ru\/album\/([0-9]*)\/track\/([0-9]*)/,
          embedUrl: 'https://music\.yandex\.ru/iframe/#track/<%= remote_id %>/',
          html: '<iframe frameborder="0" style="border:none;width:540px;height:100px;" style="width:100%;" height="100"></iframe>',
          height: 100,
          width: 540,
          id: (ids) => ids.join('/'),
        },
        'yandex-music-playlist': {
          regex: /https?:\/\/music\.yandex\.ru\/users\/([^\/\?\&]*)\/playlists\/([0-9]*)/,
          embedUrl: 'https://music\.yandex\.ru/iframe/#playlist/<%= remote_id %>/show/cover/description/',
          html: '<iframe frameborder="0" style="border:none;width:540px;height:400px;" width="540" height="400"></iframe>',
          height: 400,
          width: 540,
          id: (ids) => ids.join('/'),
        },
        codepen: {
          regex: /https?:\/\/codepen\.io\/([^\/\?\&]*)\/pen\/([^\/\?\&]*)/,
          embedUrl: 'https://codepen.io/<%= remote_id %>?height=300&theme-id=0&default-tab=css,result&embed-version=2',
          html: "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
          height: 300,
          width: 600,
          id: (ids) => ids.join('/embed/'),
        },
        instagram: {
          regex: /https?:\/\/www\.instagram\.com\/p\/([^\/\?\&]+)\/?/,
          embedUrl: 'https://www.instagram.com/p/<%= remote_id %>/embed',
          html: '<iframe width="400" height="505" style="margin: 0 auto;" frameborder="0" scrolling="no" allowtransparency="true"></iframe>',
          height: 505,
          width: 400,
        },
        twitter: {
          regex: /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)(?:\/.*)?$/,
          embedUrl: 'https://twitframe.com/show?url=https://twitter.com/<%= remote_id %>',
          html: '<iframe width="600" height="600" style="margin: 0 auto;" frameborder="0" scrolling="no" allowtransparency="true"></iframe>',
          height: 300,
          width: 600,
          id: ids => ids.join('/status/'),
        },
        github:{
          regex:/https?:\/\/gist\.github\.com\/([^\/\?\&]*)\/([^\/\?\&]*)\.js/,
          embedUrl: 'https://gist.github.com/<%= remote_id %>/',
          html: "<script></script>",
         
          height: 505,
          width: 400,
          id: (ids) => ids.join('/'),
        },


        megaphone:{
          regex:/https:\/\/megaphone\.link\/([^\/\?\&]*)/,
          embedUrl: 'https://playlist.megaphone.fm/?e=<%= remote_id %>',
          html: "<iframe height='300' width='300' scrolling='no' frameborder='no' allowtransparency='true' style='width: 100%'></iframe>",
         
          height: 380,
          width: 300,
          id: (ids) => ids.join('/'),
        },
        spotify_podcasts: {
          regex: /https:\/\/open\.spotify\.com\/embed-podcast\/episode\/([^\/\?\&]*)/,
          embedUrl: 'https://open.spotify.com/embed-podcast/episode/<%= remote_id %>/',
          html: '<iframe frameborder="0" style="border:none;width:540px;height:250px;" style="width:100%;" height="100"></iframe>',
          height: 100,
          width: 540,
          id: (ids) => ids.join('/'),
        },
        spotify_album: {
          regex: /https:\/\/open\.spotify\.com\/album\/([^\/\?\&]*)/,
          embedUrl: 'https://open.spotify.com/embed/album/<%= remote_id %>/',
          html: '<iframe frameborder="0" style="border:none;width:540px;height:250px;" style="width:100%;" height="100"></iframe>',
          height: 100,
          width: 540,
          id: (ids) => ids.join('/'),
        },
        spotify_track: {
          regex: /https:\/\/open\.spotify\.com\/track\/(.*?)\?(.*)/,
          embedUrl: 'https://open.spotify.com/embed/track/<%= remote_id %>/',
          html: '<iframe frameborder="0" style="border:none;width:540px;height:250px;" style="width:100%;" height="100"></iframe>',
          height: 100,
          width: 540,
          id: (ids) => ids.join('/'),
        },
        chess_com:{
          regex:/\[gid=([^"]+)\]/,
          embedUrl: 'https://www.chess.com/emboard?id=<%= remote_id %>',
          html: "<iframe height='440' width='300' scrolling='no' frameborder='no' allowtransparency='true' style='width: 100%'></iframe>",
         
          height: 540,
          width: 300,
          id: (ids) => ids.join('/'),
        },

        tiktok:{
          regex: /https:\/\/www\.tiktok\.com\/([^\/\?\&]*)\/video\/([^\/\?\&]*)/,
          embedUrl:'https://www.tiktok.com/<%= remote_id %>/video/<%= remote_id %>',
          html: '<iframe frameborder="0" style="border:none;width:540px;height:250px;" style="width:100%;" height="100"></iframe>',
          height: 100,
          width: 540,
          id: (ids) => ids.join('/'),
        },
        pintrest: {
          regex: /https:\/\/www\.pintrest\.com\/pin\/([^\/\?\&]+)\/?/,
          embedUrl: 'https://www.pinterest.com/pin/<%= remote_id %>/',
          html: '<iframe width="400" height="505" style="margin: 0 auto;" frameborder="0" scrolling="no" allowtransparency="true"></iframe>',
          height: 505,
          width: 400,
        },
        // https://docs.google.com/document/d/e/2PACX-1vR_SaQf_Hs1esSo-iwg2AD9Qdu1VuEKWz3NH27nRcn8SKTTDxlZ2XuCWxWHVbYLHgz0qyEUngTgYyu2/pub
        // https://docs.google.com/document/d/e/2PACX-1vR_SaQf_Hs1esSo-iwg2AD9Qdu1VuEKWz3NH27nRcn8SKTTDxlZ2XuCWxWHVbYLHgz0qyEUngTgYyu2/pub?embedded=true
        google_docs:{
          regex: /https:\/\/docs\.google\.com\/document\/d\/e\/(.*?)\/pub/,
          embedUrl: 'https://docs.google.com/document/d/e/<%= remote_id %>/pub?embedded=true',
          html: '<iframe width="400" height="505" style="margin: 0 auto;" frameborder="0" scrolling="yes" allowtransparency="true"></iframe>',
          height: 505,
          width: 400,
        }
        ,
        google_forms:{
          // <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfZy3b8GHr7484LXQQB9oO0xcQp7deh6rEq3GQ9Bgi73Hn0Dg/viewform?embedded=true" width="640" height="955" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
          regex: /https:\/\/docs\.google\.com\/forms\/d\/e\/(.*?)\/viewform\?usp=sf_link/,
          embedUrl: 'https://docs.google.com/forms/d/e/<%= remote_id %>/viewform?embedded=true',
          html: '<iframe width="400" height="505" style="margin: 0 auto;" frameborder="0" scrolling="yes" allowtransparency="true"></iframe>',
          height: 505,
          width: 400,
        },
        // <iframe width="640" height="360" src="https://www.kickstarter.com/projects/sbrick/connect-code-create-with-sbrick-plus/widget/video.html" frameborder="0" scrolling="no"> </iframe>
        gofundme:{
          regex: /https:\/\/www\.kickstarter\.com\/projects\/([^\/\?\&]*)\/([^\/\?\&]*)\/?/,
          embedUrl: 'https://www.kickstarter.com/projects/<%= remote_id %>/widget/video.html',
          html: '<iframe width="270" height="480" style="margin: 0 auto;" frameborder="0" scrolling="yes" allowtransparency="true"></iframe>',
          height: 480,
          width: 270,
          id: (ids) => ids.join('/'),
        },
        // https://podcasts.apple.com/us/podcast/tcp-udp/id1120964487?i=1000518220597
        // https://embed.podcasts.apple.com/us/podcast/tcp-udp/id1120964487?i=1000518220597
        //<iframe allow="autoplay *; encrypted-media *; fullscreen *" frameborder="0" height="175" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.podcasts.apple.com/us/podcast/tcp-udp/id1120964487?i=1000518220597&theme=light"></iframe>
        // http://localhost:3000/admin/link/6085843c83009d09284e87d4/edit
        apple_podcats:{
          regex: /https:\/\/podcasts\.apple\.com\/([^\/\?\&]*)\/podcast\/([^\/\?\&]*)\/([^\/\?\&]*)\?i=([^\/\?\&]*)/,
          embedUrl: 'https://embed.podcasts.apple.com/<%= remote_id %>/podcast/<%= remote_id %>?i=<%= remote_id %>',
          html: '<iframe allow="autoplay *; encrypted-media *; fullscreen *" frameborder="0" height="175" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"></iframe>',
          height: 175,
          width: 270,
          id: (ids) => ids.join('/'),
        },
        // https://podcasts.apple.com/us/podcast/go-time/id1120964487
        //<iframe allow="autoplay *; encrypted-media *; fullscreen *" frameborder="0" height="450" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.podcasts.apple.com/us/podcast/go-time/id1120964487?theme=light"></iframe>
      //https://embed.podcasts.apple.com/us/podcast/go-time/id1120964487
        apple_podcats_show:{
          regex: /https:\/\/podcasts\.apple\.com\/([^\/\?\&]*)\/podcast\/([^\/\?\&]*)\/([^\/\?\&]*)/,
          embedUrl: 'https://embed.podcasts.apple.com/<%= remote_id %>/podcast/<%= remote_id %>',
          html: '<iframe allow="autoplay *; encrypted-media *; fullscreen *" frameborder="0" height="175" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"></iframe>',
          height: 175,
          width: 270,
          id: (ids) => ids.join('/'),
        }
     
        // slideshare:{
        //   regex://
        // }
        

//https://open.spotify.com/embed-podcast/episode/
        // https://open.spotify.com/embed-podcast/episode/763zru0TwLIoNOEFSYUwcC
        // <iframe frameBorder="0" height="482" scrolling="no" src="https://playlist.megaphone.fm/?e=CSIS6846221781" width="100%"></iframe>
      }
    }},
    // personality: {
    //   class: Personality,
    //   config: {
    //     uploader:{uploadByFile: uploadByFile,},
    //   }
    // },
  //   carousel: {
  //     class: Carousel,
  //     config: {
  //       uploader:{uploadByFile: uploadByFile,},
  //     }
  // },
  clipboard:Clipboard,
  strikethrough: {
    class: Strikethrough,
    shortcut: 'CMD+SHIFT+X',
  },

  table: Table,
  marker: Marker,
  // AttachesTool:{
  //   class: AttachesTool,
  //   config: {
  //     uploader:{uploadByFile: uploadOnlyFile,}
  //      byFile:'http://localhost:3000/api/upload'
  //   }, },
  list: List,
  warning: Warning,
  code: Code,
  FontSize:FontSizeTool,
  alert: Alert,
  linkTool:  {
    class: LinkTool,
    config: {
      endpoint: 'api/metadata/', // Your backend endpoint for url data fetching
    }
  },
  // Carousel:{
  //   class: Carousel,
  //   config: {
  //     uploader:{uploadByFile: uploadByFile,}
  //     // byFile:'http://localhost:3000/api/upload'
  //   },
  // },
 
 
 
 
 
//    imagep: {
//     class: InlineImage,
//     inlineToolbar: true,
//     config: {
//       unsplash: {
//         appName: "editor",
//         clientId: "4tdhJY97Q-RaTfSnMLy73_9cMAhyjUg8Yo6OcU4DeUM"
//       }
//     }
//     ,          toolbox: {
//       icon: `
//       <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
// 	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
// <g>
// 	<path d="M160,144V0h192v144H160z M352,224h160v288H0V224h160v144h192V224z"/>
// </g>
// </svg>
//       `,
//       title: "Image Online",
//     },
//   },
  image: {
    class: Image,
   
    config: {

      uploader:{uploadByFile: uploadByFile,},
      actions: [
        {
            name: 'new_button',
            icon:'<svg width="100" height="100"><circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" /></svg>',
            title: 'New Button',
            action: (name) => {
                alert(`${name} button clicked`);
                return false;
            }
        }
    ]
      // byFile:'http://localhost:3000/api/upload'
    }

  
  },    fontFamily: Fontfamily,
  textColor: TextColor,
  raw: Raw,
  header:Header,
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode
};


// import Embed from "@editorjs/embed";
// import Table from "@editorjs/table";
// import List from "@editorjs/list";
// import Warning from "@editorjs/warning";
// import Code from "@editorjs/code";
// import LinkTool from "@editorjs/link";
// import Image from "@editorjs/image";
// import Raw from "@editorjs/raw";
// import Header from "@editorjs/header";
// import Quote from "@editorjs/quote";
// import Marker from "@editorjs/marker";
// import Carousel from "@vietlongn/editorjs-carousel";
// import CheckList from "@editorjs/checklist";
// import Delimiter from "@editorjs/delimiter";
// import InlineCode from "@editorjs/inline-code";
// import InlineImage from "editorjs-inline-image";
// import SimpleImage from "@editorjs/simple-image";

// export const EDITOR_JS_TOOLS = {
//   embed: Embed,
//   table: Table,
//   marker: Marker,
//   list: List,
//   warning: Warning,
//   code: Code,
//   linkTool: LinkTool,
//   carousel: Carousel,
//   image: {
//     class: InlineImage,
//     inlineToolbar: true,
//     config: {
//       unsplash: {
//         appName: "editor",
//         clientId: ""
//       }
//     }
//   },
//   raw: Raw,
//   header: Header,
//   quote: Quote,
//   checklist: CheckList,
//   delimiter: Delimiter,
//   inlineCode: InlineCode,
//   simpleImage: SimpleImage
// };
