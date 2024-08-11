import { DBAccessFactory, DBAccessFactoryImpl } from "./db/db-access";
import { ExpressHandlerFactory, ExpressHandlerFactoryImpl } from "./handlers/handler-factory";
import { isTestEnv } from "./helpers";

export abstract class AppContext {
    abstract getHandlerFactory(): ExpressHandlerFactory
    abstract getDBAccess(): DBAccessFactory
}

class AppContextImpl extends AppContext {
    getHandlerFactory(): ExpressHandlerFactory {
        return new ExpressHandlerFactoryImpl
    }
    getDBAccess(): DBAccessFactory {
        return new DBAccessFactoryImpl()
    }
}

class TestAppContextImpl extends AppContext {
    getHandlerFactory(): ExpressHandlerFactory {
        // TODO: Implement when tests are done
        throw new Error("Method not implemented.");
    }
    getDBAccess(): DBAccessFactory {
        // TODO: Implement when tests are done
        throw new Error("Method not implemented.");
    }
}

var appContext: AppContext | null = null;

export function getAppContext(): AppContext {
    if (appContext == null) {
        if (isTestEnv()) {
            appContext = new TestAppContextImpl()
        } else {
            appContext = new AppContextImpl()
        }
    }

    return appContext
}