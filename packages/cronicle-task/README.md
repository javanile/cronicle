

```sh
npm install -g cronicle-task
```

```yaml
hosts:

  production:
    master_url: 'http://localhost:3012'
    api_key: 'kjk'

  development:
    master_url: 'asd'
    api_key: 'asd'
```


```sh
cronicle-task get -h production -e my-event -f plugin
```


```sh
./packages/cronicle-task/cronicle-task apply -e my-event -f enabled false
```






