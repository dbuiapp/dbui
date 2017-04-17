const Koa = require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const actions = require('../backend/actions');

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(async (ctx, next) => {
  const actionName = ctx.path.split('/').pop();
  const action = actions[actionName];
  console.log(action);
  console.log(ctx.request.body);
  if (!action) {
    return;
  }
  try {
    const response = await action(ctx.request.body);
    ctx.body = response;
  } catch (err) {
    ctx.status = 400;
    ctx.body = { error: err.message };
  }
})

app.listen(3200);
