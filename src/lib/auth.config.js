import Google from "@auth/core/providers/google"
import GitHub from '@auth/core/providers/github'
import Credentials from "@auth/core/providers/credentials"
import { obtenerUsuarioPorEmail } from "@/lib/data/users"

const AuthConfig = {
    providers: [
        Google,
        GitHub,
        Credentials({
            async authorize(credentials) {
                console.log('AUTHORIZE');
                return obtenerUsuarioPorEmail(credentials.email)
            },
        }),
    ]
}

export default AuthConfig;