/* eslint-disable no-console */
import compression from 'compression';
import * as sapper from '@sapper/server';
import fileUpload from 'express-fileupload'
const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
import logger from './logger';
import app from './app'
import { resolve } from 'path'
process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
	createParentPath: true
}));

app.post('/upload', async (req, res) => {
	req.files.files.name.replace(" ", "") 
	const mimetype = req.files.files.mimetype.split('/')[1]
	console.log(req.body)
	await req.files.files.mv(resolve(process.cwd(), 'static', req.body.category, `${req.body.name}.${mimetype}`), async err => {
		if(err) console.error(err)
		const file = await app.service('file').create({
			path : `/${req.body.category}/${req.body.name}.${mimetype}`,
			name : req.body.name,
			category: req.body.category,
			describtion: req.body.description
		})
	
		console.log('file', file)
	})

	
})
app // You can also use Express
	.use(
		compression({ threshold: 0 }),
		
		sapper.middleware({
			session: (req,res) => {
				
			}
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});

app.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);
