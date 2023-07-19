import { ThemeProvider } from "./theme";
import { LocalStorageExample } from "@/components/local-storage-example";
import { SessionStorageExample } from "./components/session-storage-example";
import { CookieStorageExample } from "./components/cookie-storage-example";
import { IndexedDBStorageExample } from "./components/indexeddb-storage-example";

export const App = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <section>
        <h3>Theme switcher with localStorage</h3>
        <LocalStorageExample />
        <ul>
          <li><pre>key</pre> и <pre>value</pre> должны быть строками.</li>
          <li>Данные привязаны к источнику (домен/протокол/порт).</li>
          <li>Совместно используется между всеми вкладками и окнами с одинаковым источником</li>
          <li>«Переживает» перезапуск браузера</li>
        </ul>
      </section>
      <section>
        <h3>Form autosave with sessionStorage</h3>
        <SessionStorageExample />
        <ul>
          <li><pre>key</pre> и <pre>value</pre> должны быть строками.</li>
          <li>Данные привязаны к источнику (домен/протокол/порт).</li>
          <li>Разделяется в рамках вкладки браузера, среди ифреймов из того же источника</li>
          <li>«Переживает» перезагрузку страницы (но не закрытие вкладки)</li>
        </ul>
      </section>
      <section>
        <h3>Cookies example</h3>
        <CookieStorageExample />
        <ul>
          <li>Запись в <pre>document.cookie</pre> обновит только упомянутые в ней куки, но при этом не затронет все остальные</li>
          <li>Можно установить как из браузера*, так и с сервера</li>
          <li>Доп. настройки <pre>path, domain, expires, max-age, secure, samesite, httpOnly</pre></li>
        </ul>
      </section>
      <section>
        <h3>IndexedDB example</h3>
        <IndexedDBStorageExample />
        <ul>
          <li>Возможно хранить сложные типы данных (объекты, File, Blob)</li>
          <li>Обертки Dexie.js, idb, localforage</li>
        </ul>
      </section>
    </ThemeProvider>
  );
};
