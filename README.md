# Testing our PSK on JxCore
Basic solution that uses PouchDB along with replication via PouchDB.

This requires an interim build of [JxCore](http://jxcore.com/home/) that has an outstanding Pull Request [#813](https://github.com/jxcore/jxcore/pull/813).

## Setting up..

- [ ] First - clone the branch from here: [github.com/cicorias/jxcore/adding-psk-tls](https://github.com/cicorias/jxcore/tree/adding-psk-tls)
- [ ] Build that solution - follow the JxCore instructions from the point of Clone - [here](https://github.com/jxcore/jxcore/blob/master/doc/HOW_TO_COMPILE.md)
- [ ] Once you've built - either Debug or Release you can add the `jx.exe` to your path
- [ ] Clone "this" repository 

**Note** : the `jx install` is the same as npm install, but using JxCore's NPM version located in `./.jx`.

```
git clone https://github.com/cicorias/PskReplicant.git
cd .\PskReplicant
{PATH_TO_JX.exe}\jx.exe  install
{PATH_TO_JX.exe}\jx.exe  .\bin\www

```

## Running solution

This launches a single process that will host 3 HTTPS/TLS listeners.

For example, I've cloned and now I'm running with:

```
D:\g\thali\PskReplicant [master]> D:\g\jxcore-m\Release\jx .\bin\www
```

- [ ] Launch the site by going to [https://localhost:3000/replicate](https://localhost:3000/replicate)
- [ ] Open another tab to see Fauxton's interface [http://localhost:3002/_utils/](http://localhost:3002/_utils/)
** NOTE: ** 1st URL is `https` and the 2nd is `http`
- [ ] Create a PouchDB called `foobar`
- [ ] Create another PouchDB called `foobarrepl'
- [ ] On the main page - create some documents via the 2nd button (see image labeled poorly 'step 1')
- [ ] On the main page - initiate an on demand replication with 1st button (see image labeled poorly 'step 2')


### Other Notes
You can enable  more debugging by adding `DEBUG=PskReplicant:` to the environment before running...

```
SET DEBUG=PskReplicant:*
```
or 
```
export DEBUG=PskReplicant:*; {PATH_TO_JX.exe}\jx .\bin\www
```

### Detailed Debug Information

For tremendous chatter, you can enable the full debugging experience:

```
SET DEBUG=PskReplicant:*
SET NODE_DEBUG=tls
```
or
```
export DEBUG=PskReplicant:*; export NODE_DEBUG=tls; {PATH_TO_JX.exe}\jx .\bin\www
```


## Running site:
Main Page: ![](https://farm2.staticflickr.com/1485/24763488099_9ba73f247b_b.jpg)
Fauxton Page: ![](https://farm2.staticflickr.com/1471/24504349913_e124b6cbb3_b.jpg)

### Debug messages after adding - then replication
Below is an example running that shows the debug messages - note the multiple calls that occur when PouchDB client makes multiple calls during replication - and each is validated on both server/client side.

Debug Messages: ![](https://farm2.staticflickr.com/1582/24506585163_2a0be750bc_b.jpg)