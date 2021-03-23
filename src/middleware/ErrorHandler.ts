export const handler = async (ctx, next) => {
    try {
		await next();
    } catch (error) {
		ctx.status = error.status || 400;
		ctx.body = { msg: error.toString() };
		return ctx;
    }
}