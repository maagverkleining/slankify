import ftplib
import getpass
import socket

hostname = "apm-feed.unftp.bol.com"
username = input("Bol gebruikersnaam: ")
password = getpass.getpass("Bol wachtwoord: ")

try:
    print("Verbinding maken...")
    ftp = ftplib.FTP_TLS()
    ftp.connect(hostname, 21, timeout=15)
    print("Verbonden, inloggen...")
    ftp.login(username, password)
    ftp.prot_p()
    ftp.set_pasv(True)
    print("Ingelogd! Bestanden ophalen...")
    files = ftp.nlst()
    print("Beschikbare feeds:")
    for f in sorted(files):
        print(" -", f)
    ftp.quit()
except ftplib.error_perm as e:
    print(f"Login fout (verkeerde credentials?): {e}")
except socket.timeout:
    print("Timeout - server reageert niet")
except Exception as e:
    print(f"Fout: {type(e).__name__}: {e}")
