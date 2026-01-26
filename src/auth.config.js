import Google from "@auth/core/providers/google"
import GitHub from '@auth/core/providers/github'
import Spotify from '@auth/core/providers/spotify'
import Gitlab from '@auth/core/providers/gitlab'
import Credentials from "@auth/core/providers/credentials"
import { obtenerUsuarioPorEmail } from "@/lib/data/users"

const AuthConfig = {
    providers: [
        Google,
        GitHub,
        Spotify,
        Gitlab,
        Credentials({
            async authorize(credentials) {
                console.log('AUTHORIZE');
                return obtenerUsuarioPorEmail(credentials.email)
            },
        }),
    ]
}

export default AuthConfig;